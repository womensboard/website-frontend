import clsx from 'clsx';
import AppLink from '../atom/app-link';
import { CancelButton } from '../atom/cancel-button';
import Logo from '../atom/logo';

type SidebarItemProps = {
  label: string;
  items?: { href: string; text: string }[];
  href?: string;
};

const SidebarItem = (props: SidebarItemProps) => {
  const { label, items = [], href } = props;

  return (
    <li>
      {items?.length === 0 && (
        <AppLink
          href={href || '#'}
          className="flex items-center py-6 hover:bg-primary_color"
        >
          <span className="ml-6">{label}</span>
        </AppLink>
      )}
    </li>
  );
};

type SidebarProps = {
  visible: boolean;
  isAdmin: boolean;
  onClose: () => void;
  navLinks: { href: string; title: string }[];
};

const Sidebar = (props: SidebarProps) => {
  const { visible = false, onClose, isAdmin = false, navLinks } = props;

  return (
    <>
      <div
        className={clsx(
          'fixed top-0 left-0 z-40 w-full xl:w-64 h-screen  overflow-y-auto transition-transform bg-white dark:bg-gray-800 ',
          visible ? 'translate-none' : '-translate-x-full'
        )}
        tabIndex={-1}
      >
        <div className="text-base  p-4 font-semibold text-gray-500 uppercase dark:text-gray-400">
          <Logo isAdmin={isAdmin} />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-4 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <CancelButton />
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {navLinks.map((navLink, index) => (
              <SidebarItem
                key={index}
                label={navLink.title}
                href={navLink.href}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
