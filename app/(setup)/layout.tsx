import { PropsWithChildren } from 'react'

const SetupLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>{children}</main>
  )
}

export default SetupLayout

/* 
setuplayout props {
  children: {
    '$$typeof': Symbol(react.element),
    type: {
      '$$typeof': Symbol(react.lazy),
      _payload: [Promise],
      _init: [Function: q]
    },
    key: null,
    ref: null,
    props: {
      parallelRouterKey: 'children',
      segmentPath: [Array],
      hasLoading: false,
      template: [Object],
      notFound: [Array],
      notFoundStyles: [],
      childProp: [Object],
      styles: []
    },
    _owner: null,
    _store: {}
  },
  params: {}
}
*/
