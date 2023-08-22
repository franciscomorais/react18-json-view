import { createContext } from 'react'
import JsonNode from './json-node'

type OnEdit = (event: {
	newValue: any
	oldValue: any
	depth: number
	src: any
	name: string | number
	parentType: 'object' | 'array'
}) => void

export const JsonViewContext = createContext({
	collapseStringsAfterLength: 99,
	collapseObjectsAfterLength: 20,
	enableClipboard: true,
	collapsed: false as number | boolean,
	editable: false,
	src: undefined,
	onEdit: ((_: any) => {}) as OnEdit | undefined
})

interface Props {
	src: any
	collapseStringsAfterLength?: number
	collapseObjectsAfterLength?: number
	enableClipboard?: boolean
	collapsed?: boolean | number
	editable?: boolean
	onEdit?: OnEdit
}

export default function JsonView({
	src,
	collapseStringsAfterLength = 99,
	collapseObjectsAfterLength = 20,
	enableClipboard = true,
	collapsed = false,
	editable = false,
	onEdit
}: Props) {
	return (
		<JsonViewContext.Provider
			value={{
				collapseStringsAfterLength,
				collapseObjectsAfterLength,
				enableClipboard,
				collapsed,
				editable,
				src,
				onEdit
			}}>
			<code className='json-view'>
				<JsonNode node={src} depth={1} />
			</code>
		</JsonViewContext.Provider>
	)
}