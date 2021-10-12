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
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    shadowOpacity: 0,
    shadowRadius: 40,
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
  }
})

const INITIAL_OFFSET = 10
const MAX_SHADOW_OPACITY = 0.4
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
  const shadowAnim = useRef(new Animated.Value(0)).current

  const slideIn = useCallback(() => {
    Animated.spring(translationAnim, {
      toValue: openPosition,
      tension: 150,
      friction: 25,
      useNativeDriver: true
    }).start()

    Animated.spring(shadowAnim, {
      toValue: MAX_SHADOW_OPACITY,
      tension: 150,
      friction: 25,
      useNativeDriver: true
    }).start()
  }, [openPosition, translationAnim, shadowAnim])

  const slideOut = useCallback(() => {
    Animated.spring(translationAnim, {
      toValue: initialPosition,
      tension: 150,
      friction: 25,
      useNativeDriver: true
    }).start()

    Animated.spring(shadowAnim, {
      toValue: 0,
      tension: 150,
      friction: 25,
      useNativeDriver: true
    }).start()
  }, [initialPosition, translationAnim, shadowAnim])

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

  // TODO: sk - click outside
  // NOTE: This is currently handled by the web app
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
            shadowOpacity: shadowAnim,
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
