import { FloatingPortal, offset, shift, useFloating, type Placement } from '@floating-ui/react'
import { arrow } from '@floating-ui/dom'
import { useId, useRef, useState, type ElementType } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

const Popover = ({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initialOpen = false,
  placement = 'bottom-end'
}: Props) => {
  const id = useId()
  const arrownElement = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen)
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [offset(10), shift(), arrow({ element: arrownElement.current as Element })],
    placement: placement
  })
  return (
    <Element
      ref={refs.setReference}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={className}
    >
      {children}
      <FloatingPortal id={id}>
        {isOpen && (
          <AnimatePresence>
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: `${middlewareData.arrow?.x}px top`,
                zIndex: 99
              }}
              initial={{
                opacity: 0,
                transform: 'scale(0)'
              }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
            >
              <div className='relative rounded-sm shadow-md border border-gray-200 bg-white'>
                <span
                  ref={arrownElement}
                  className='border-x-transparent border-t-transparent border-[11px] border-b-white translate-y-[-98%] z-[1]'
                  style={{
                    position: 'absolute',
                    top: middlewareData.arrow?.y,
                    left: middlewareData.arrow?.x
                  }}
                />
                {renderPopover}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </FloatingPortal>
    </Element>
  )
}

export default Popover
