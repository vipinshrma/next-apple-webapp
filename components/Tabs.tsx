import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface Props{
    categories:Category[],
    showProduct:(val:number)=>JSX.Element

}

export default function Tabs({categories=[],showProduct}:Props) {

  return (
      <Tab.Group>
        <Tab.List className="flex justify-center">
          {categories.map((category) => (
            <Tab
              key={category?._id}
              className={({ selected }) =>
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                selected ? 'bordergradient bg-[#35383C] text-white' : 'border-b-2 border-[#35383C] text-[#747474]'
              }`
              }
            >
              {category?.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
          <Tab.Panel className={"tabPanel"}>{showProduct(0)}</Tab.Panel>
          <Tab.Panel className={"tabPanel"}>{showProduct(1)}</Tab.Panel>
          <Tab.Panel className={"tabPanel"}>{showProduct(2)}</Tab.Panel>
          <Tab.Panel className={"tabPanel"}>{showProduct(3)}</Tab.Panel>


        </Tab.Panels>
      </Tab.Group>
  )
}
