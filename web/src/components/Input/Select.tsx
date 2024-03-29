import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Check, ChevronDown } from 'react-feather';
import { classNames } from '../../utils/classNames';

interface Props {
  label?: string;
  data: string[];
  selected: string;
  setSelected: (val: string) => void;
  className: string;
  rounded?: { top?: boolean; bottom?: boolean };
}

const SelectInput: React.FC<Props> = ({
  label,
  data,
  selected,
  setSelected,
  className,
  rounded,
}: Props) => {
  return (
    <div className={className}>
      <Listbox value={selected} onChange={setSelected}>
        {label && (
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
        )}

        <div className="mt-1 relative">
          <Listbox.Button
            className={classNames(
              'relative w-full bg-white border border-gray-300 shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-300 dark:border-gray-700',
              rounded?.top ? 'rounded-t-md' : '',
              rounded?.bottom ? 'rounded-b-md' : ''
            )}
          >
            <span className="flex items-center">
              <span className="ml-3 block truncate">{selected}</span>
            </span>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {data.map((el, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={el}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'ml-3 block truncate'
                          )}
                        >
                          {el}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectInput;
