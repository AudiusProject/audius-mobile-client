import React, {
  useEffect,
  useCallback,
  useRef,
  ReactNode,
  useState
} from 'react'
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet
} from 'react-native'
import { Portal } from '@gorhom/portal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../../utils/theme'

const styles = StyleSheet.create({
  drawer: {
    zIndex: 22,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    marginBottom: 0,
    paddingTop: 0,
    borderRadius: 40
  },

  fullDrawer: {
    top: 0,
    height: '100%'
    // overflowX: 'hidden',
    // overflowY: 'scroll'
  },

  // fullDrawer > div {
  //   margin-top: env(safe-area-inset-top, 0px),
  //   margin-bottom: 10vh,
  // }

  dismissContainer: {
    position: 'absolute',
    top: 16,
    left: 16
  },

  // dismissContainer path {
  //   fill: var(--neutral-light-4),
  // },

  isOpen: {
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 50,
      height: 15
    }
  },

  background: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0
  },

  /*
   * Fixes positioning on ios Safari due to the navigation
   * bar that appears while scrolling up / down.
   * When testing this, make sure to test Safari embedded inside Twitter.
   */
  // @supports (-webkit-overflow-scrolling: touch) {
  //   .drawer:not(.native):not(.fullDrawer).isOpen {
  //     top: calc(100vh - 100px);
  //   }
  //   .drawer:not(.native):not(.fullDrawer):not(.isOpen) {
  //     top: calc(100vh + 100px);
  //   }
  // }

  skirt: {
    position: 'absolute',
    /* Need to provide a small overlap
    between skirt and now playing,
    otherwise we see a ~1px gap
    between them when the drawer translates.
    (Probably something to due with fractional
    pixel translations/aliasing etc)
  */
    bottom: 799,
    left: 0,
    right: 0,
    height: 800
  }
})

// Hide the drawer when the keyboard is down
const DRAWER_KEYBOARD_UP = 50

// Fraction of swipe up to fade (1 / FADE_FRACTION_DENOMINATOR)
const FADE_FRACTION_DENOMINATOR = 2

// Cut off where an open is considered an open
const OPEN_CUTOFF = 0.2
// Cut off where a close is considered a close
const CLOSE_CUTOFF = 0.7
// Cut off where velocity trumps open/close cut offs
const VELOCITY_CUTOFF = 0.5

// Controls the amount of friction in swiping when overflowing up or down
const OVERFLOW_FRICTION = 4

const INITIAL_OFFSET = 10
const MAX_BG_OPACITY = 0.3
const ON_MOVE_RESPONDER_DX = 20
const ON_MOVE_RESPONDER_DY = 10
const MOVE_CUTOFF_CLOSE = 0.8
const MOVE_CUTOFF_OPEN = 0.2

export type DrawerProps = {
  isOpen: boolean
  onOpen: () => void
  children: ReactNode
  onClose: () => void
  isFullscreen?: boolean
}

const Drawer = ({
  isOpen,
  onOpen,
  children,
  onClose,
  isFullscreen
}: DrawerProps) => {
  const drawerStyle = useTheme(styles.drawer, {
    backgroundColor: 'neutralLight10'
  })

  const { height } = Dimensions.get('window')
  const [drawerHeight, setDrawerHeight] = useState(0)
  const initialPosition = height + INITIAL_OFFSET
  const openPosition = height - drawerHeight

  const translationAnim = useRef(new Animated.Value(initialPosition)).current

  const slideIn = useCallback(() => {
    Animated.spring(translationAnim, {
      toValue: openPosition,
      tension: 150,
      friction: 25,
      useNativeDriver: true
    }).start()
  }, [translationAnim])

  const slideOut = useCallback(() => {
    Animated.spring(translationAnim, {
      toValue: initialPosition,
      tension: 150,
      friction: 25,
      useNativeDriver: true
    }).start()
  }, [initialPosition, translationAnim])

  useEffect(() => {
    if (isOpen) {
      slideIn()
    } else {
      slideOut()
    }
  }, [slideIn, slideOut, isOpen])

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (e, gestureState) => {
      return (
        Math.abs(gestureState.dx) > ON_MOVE_RESPONDER_DX &&
        Math.abs(gestureState.dy) < ON_MOVE_RESPONDER_DY
      )
    },
    onPanResponderMove: (e, gestureState) => {
      if (isOpen) {
        if (gestureState.dy > 0) {
          Animated.event(
            [
              null,

              {
                dy: translationAnim
              }
            ],
            { useNativeDriver: false }
          )(e, { dy: openPosition + gestureState.dy })
        }
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (isOpen) {
        // Close if open & drag is past cutoff
        if (
          gestureState.vy > 0 &&
          gestureState.moveY > height - MOVE_CUTOFF_CLOSE * drawerHeight
        ) {
          slideOut()
          onClose()
        } else {
          slideIn()
        }
      }
    }
  })

  // TODO: click outside
  //   const clickOutsideRef = useClickOutside(() => close())

  // TODO: border radius transition for fullscreen drawer

  return (
    <Portal>
      <Animated.View
        {...panResponder.panHandlers}
        onLayout={(event: LayoutChangeEvent) => {
          const { height } = event.nativeEvent.layout
          setDrawerHeight(height)
        }}
        style={[
          drawerStyle,
          ...(isFullscreen ? [styles.fullDrawer] : []),
          {
            transform: [
              {
                translateY: translationAnim
              }
            ]
          }
        ]}
      >
        <SafeAreaView edges={['bottom']}>{children}</SafeAreaView>
      </Animated.View>
    </Portal>
  )
}

const interpolateBorderRadius = (r: number) => {
  // multiply R by some constant and then clamp so that for the majority
  // of the transition, it stays at it's initial value
  const r2 = Math.max(Math.min(r * 10, 40), 0)
  return `${r2}px ${r2}px 0px 0px`
}

// const FullscreenDrawer = ({ children, isOpen, onClose }: DrawerProps) => {
//   const drawerRef = useRef<HTMLDivElement | null>(null)

//   const transitions = useTransition(isOpen, {
//     from: {
//       y: 1,
//       borderRadius: 40
//     },
//     enter: {
//       y: 0,
//       borderRadius: 0
//     },
//     leave: {
//       y: 1,
//       borderRadius: 40
//     },
//     config: slowWobble
//   })
//   return (
//     <Portal>
//       <Animated.View
//         ref={drawerRef}
//         className={[styles.drawer, styles.fullDrawer]}
//         style={{
//           transform: y.to(y => interpY(window.innerHeight * y)),
//           borderRadius: borderRadius.to(interpolateBorderRadius)
//         }}
//       >
//         {/* <View style={styles.dismissContainer} onClick={onClose}>
//                 <IconRemove />
//               </View> */}
//         {children}
//       </Animated.View>
//     </Portal>
//   )
// }

export default Drawer
