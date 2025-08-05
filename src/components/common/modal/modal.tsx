import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from '@/components/ui/dialog'
import {Props} from './types'
import {cn} from '@/lib/utils'
import React from 'react'
import {Button} from '@/components/ui/button'
import {MdOutlineCancel} from 'react-icons/md'
/**
 * @param Modal
 * @example
 * props => [title, children, open, className, footerChildren]
 *
 *  const [isModalOpen, setIsModalOpen] = useState(false)
 *
 *  <Modal
 *     title='Example Title'
 *     footerChildren={
 *       <div>
 *         <Button theme="primary">Save</Button>
 *       </div>
 *     }
 *  open={isModalOpen}
 *  close={setIsModalOpen}
 *  >
 *     Modal content element
 *  </Modal>
 */

export const Modal: React.FC<Props> = ({
  title,
  children,
  className,
  footerChildren,
  open,
  close,
  footerVisible,
  visibleIcon = false,
  visibleScroll = true,
}) => (
  <Dialog open={open} onOpenChange={close}>
    <DialogContent className={cn('max-w-fit min-w-80 !p-0 !py-[18px] rounded-lg', {'!pr-2': visibleScroll})}>
      <div className={cn('max-h-[500px] px-5', {'modalScroll overflow-y-auto': visibleScroll}, className)}>
        {title && (
          <DialogHeader className="!text-left w-full relative flex justify-between items-center">
            <DialogTitle
              className={cn(
                'font-fredoka w-full text-grey-dark-900 text-20 text-center font-semibold leading-28 mb-2 line-clamp-1 break-all',
                {
                  'text-left': visibleIcon,
                },
              )}
            >
              {title}
            </DialogTitle>
            {visibleIcon && (
              <DialogClose onClick={close} className="w-[30px] h-[30px] absolute top-[-6px] right-0 cursor-pointer">
                <MdOutlineCancel className="w-[30px] h-[30px]" />
              </DialogClose>
            )}
          </DialogHeader>
        )}
        <div className="font-quicksand font-semibold text-grey-dark-500 text-16 leading-24">{children}</div>
        {footerVisible && (
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={close} className="border-none mt-2 !text-18 text-grey-dark-500">
                Cancel
              </Button>
            </DialogClose>
            {footerChildren}
          </DialogFooter>
        )}
      </div>
    </DialogContent>
  </Dialog>
)
