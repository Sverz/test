import { ExceptionKeys } from 'src/shared'
export interface DomainErrorParams {
	key: ExceptionKeys | string
	description: string
}
