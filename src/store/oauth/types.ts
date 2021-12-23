import { Credentials as TikTokCredentials } from '@audius-client/src/common/hooks/useTiktokAuth'

export type Credentials = TikTokCredentials | { error: string }
