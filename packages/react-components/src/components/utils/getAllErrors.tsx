import customMessages from '#utils/customMessages'
import { type LineItem } from '@commercelayer/sdk'
import { type BaseError } from '#typings/errors'
import { type TResourceError } from '#components/errors/Errors'

export interface AllErrorsParams {
  allErrors: BaseError[]
  messages: BaseError[]
  field?: string
  props: JSX.IntrinsicElements['span']
  lineItem?: LineItem | null
  resource?: TResourceError
  returnHtml?: boolean
}

export type GetAllErrors = <P extends AllErrorsParams>(
  params: P
) => Array<JSX.Element | string | undefined>

const getAllErrors: GetAllErrors = (params) => {
  const {
    allErrors,
    messages,
    field,
    props,
    lineItem,
    resource,
    returnHtml = true
  } = params
  return allErrors
    .map((v, k): JSX.Element | string | undefined => {
      const objMsg = customMessages(messages, v)
      let text =
        v?.title && v?.detail != null && !v.detail?.includes(v.title)
          ? `${v.title} - ${v.detail}`
          : `${v?.detail || v.message}`
      if (objMsg?.message) text = objMsg?.message
      if (field) {
        if (v.resource === 'line_items') {
          if (lineItem && v.id === lineItem.id) {
            return returnHtml ? (
              <span key={k} {...props}>
                {text}
              </span>
            ) : (
              text
            )
          }
        }
        if (field === v.field && resource === v.resource) {
          return returnHtml ? (
            <span key={k} {...props}>
              {text}
            </span>
          ) : (
            text
          )
        }
      }
      if (resource === v.resource && !field) {
        return returnHtml ? (
          <span key={k} {...props}>
            {text}
          </span>
        ) : (
          text
        )
      }
      return undefined
    })
    .filter((v) => v !== undefined)
}

export default getAllErrors
