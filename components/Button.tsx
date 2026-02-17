import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx('rounded-lg px-4 py-2 font-medium transition bg-brand-500 text-white hover:bg-brand-700 disabled:opacity-50', className)} {...props} />;
}
