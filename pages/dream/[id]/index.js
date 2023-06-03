
import { Fragment, useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import { useRouter } from "next/router";
import axios from "axios";

const navigation = {
  categories: [
    {
      id: "wireframe",
      name: "Wireframe Kits",
      featured: [
        {
          name: "Scaffold",
          href: "#",
          imageSrc:
            "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/1_yxfrkb.png",
          imageAlt:
            "Pricing page screenshot with tiered plan options and comparison table on colorful blue and green background.",
        },
        {
          name: "Bones",
          href: "#",
          imageSrc:
            "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/1_yxfrkb.png",
          imageAlt:
            "Application screenshot with tiered navigation and account settings form on color red and purple background.",
        },
      ],
      sections: [
        {
          id: "application",
          name: "Mi Proyecto 1 Ejemplo",
          items: [
            { name: "Home Screens", href: "#" },
            { name: "Detail Screens", href: "#" },
            { name: "Settings Screens", href: "#" },
          ],
        },
        {
          id: "marketing",
          name: "Marketing",
          items: [
            { name: "Landing Pages", href: "#" },
            { name: "Pricing Pages", href: "#" },
            { name: "Contact Pages", href: "#" },
          ],
        },
        {
          id: "ecommerce",
          name: "Ecommerce",
          items: [
            { name: "Storefront Pages", href: "#" },
            { name: "Product Pages", href: "#" },
            { name: "Category Pages", href: "#" },
            { name: "Shopping Cart Pages", href: "#" },
            { name: "Checkout Pages", href: "#" },
          ],
        },
      ],
    },
    {
      id: "icons",
      name: "Icons",
      featured: [
        {
          name: "Mi Proyecto Ejemplo",
          href: "#",
          imageSrc:
            "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/1_yxfrkb.png",
          imageAlt:
            "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
        },
        {
          name: "Marketing Icon Pack",
          href: "#",
          imageSrc:
            "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/1_yxfrkb.png",
          imageAlt:
            "Calendar user interface screenshot with icon buttons and orange-yellow theme.",
        },
      ],
      sections: [
        {
          id: "general",
          name: "General Use",
          items: [
            { name: "Heroicons Solid", href: "#" },
            { name: "Heroicons Outline", href: "#" },
            { name: "Line Illustrations", href: "#" },
            { name: "Hero Illustrations", href: "#" },
            { name: "Branded Illustrations", href: "#" },
            { name: "Skeuomorphic Illustrations", href: "#" },
            { name: "Hand Drawn Illustrations", href: "#" },
          ],
        },
        {
          id: "application",
          name: "Application UI",
          items: [
            { name: "Outlined", href: "#" },
            { name: "Solid", href: "#" },
            { name: "Branded", href: "#" },
            { name: "Small", href: "#" },
            { name: "Illustrations", href: "#" },
          ],
        },
        {
          id: "marketing",
          name: "Marketing",
          items: [
            { name: "Outlined", href: "#" },
            { name: "Solid", href: "#" },
            { name: "Branded", href: "#" },
            { name: "Small", href: "#" },
            { name: "Illustrations", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "UI Kits", href: "#" },
    { name: "Themes", href: "#" },
  ],
};
const product = {
  name: "Mi Proyecto Ejemplo",
  version: { name: "1.0", date: "June 5, 2021", datetime: "2021-06-05" },
  price: "$220",
  description:
    "Apoya mi primer proyecto. Queremos recaudar mucho dinero. Vamos a transformar el mundo con nuestro proyecto. Solo con tu ayuda podemos hacer esto realidad.",
  highlights: [
    "Transformando el mundo.",
    "Sé parte de este gran proyecto.",
    "Beneficio genérico.",
  ],
  imageSrc:
    "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/2_jl8shc.png",
  imageAlt:
    "Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.",
};
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};
const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];
const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
  content: `
    <h4>Overview</h4>
    
    <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
    
    <ul role="list">
    <li>You\'re allowed to use the icons in unlimited projects.</li>
    <li>Attribution is not required to use the icons.</li>
    </ul>
    
    <h4>What you can do with it</h4>
    
    <ul role="list">
    <li>Use them freely in your personal and professional work.</li>
    <li>Make them your own. Change the colors to suit your project or brand.</li>
    </ul>
    
    <h4>What you can\'t do with it</h4>
    
    <ul role="list">
    <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
    <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
    </ul>
  `,
};
const relatedProducts = [
  {
    id: 1,
    name: "Proyecto Genérico",
    category: "Web3",
    href: "#",
    price: "$49",
    imageSrc:
      "https://res.cloudinary.com/dzdqwcqj0/image/upload/v1685750833/DreamBacker/1_yxfrkb.png",
    imageAlt:
      "Payment application dashboard screenshot with transaction table, financial highlights, and main clients on colorful purple background.",
  },
  // More products...
];
const footerNavigation = {
  products: [
    { name: "Wireframe Kits", href: "#" },
    { name: "Icons", href: "#" },
    { name: "UI Kits", href: "#" },
    { name: "Themes", href: "#" },
  ],
  company: [
    { name: "Who we are", href: "#" },
    { name: "Open Source", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "License", href: "#" },
    { name: "Privacy", href: "#" },
  ],
  customerService: [
    { name: "Chat", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Secure Payments", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const router = useRouter();
  const [dream, setDream] = useState(null);
  
  const {id} = router.query;
  const [open, setOpen] = useState(false);
  
  const getDream = async() => {
    try {      
      const response = await axios.get(`/api/dream/${id}`);
      console.log(response.data);
      setDream(response.data.dream);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(id != null && id != undefined)
    getDream();
  }, [id]);


  return (
    <>
      <NavBar />
      <div className="bg-black">       
        <div className="p-6">
          {
            dream == null ?
            (
              <div className="flex justify-center items-center h-screen">
                <div className="grid grid-cols-1 justify-items-center space-y-4">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                  <span>Cargando datos del servidor...</span>
                </div>
              </div>
            ) :
            (
              <MainLayout className="mx-auto px-4 pb-24 pt-14 sm:px-6 sm:pb-32 sm:pt-16 lg:max-w-7xl lg:px-8">
                {/* Product */}
                <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                  {/* Product image */}
                  <div className="lg:col-span-4 lg:row-end-1">
                    <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={dream.thumbnail}
                        alt={"thumbnail"}
                        className="object-cover object-center"
                        width={200}
                        height={100}
                      />
                    </div>
                  </div>

                  {/* Product details */}
                  <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                    <div className="flex flex-col-reverse">
                      <div className="mt-4">
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          {dream.title}
                        </h1>
                        <p>
                          <span className="text-lg tracking-tight text-white sm:text-xl">
                            Meta {parseFloat(dream.main_goal)} SOL
                          </span>
                        </p>
                          <span>
                            Recolectado {parseFloat(dream.collected??0)} SOL
                          </span>
                        <p className="relative w-1/2">
                          {/* Barra porcentual de meta */}
                          <div className="relative rounded-full h-4 w-full bg-gray-100">                            
                            <div className="absolute rounded-full h-4 bg-green-400"
                              style={
                                {width: `${
                                  (parseFloat(0.00001) * 100 / parseFloat(dream.main_goal)) < 100 ?
                                  (parseFloat(0.00001) * 100 / parseFloat(dream.main_goal)) : 100

                                }%`}
                              }
                            />
                          </div>
                        </p>
                        <p>
                          Deadline {new Date(dream.deadline).toLocaleString()}
                        </p>
                        <p className="mt-2 text-sm text-white">
                          Última actualización{" "}
                          <time dateTime={dream.updated_at}>
                            {new Date(dream.updated_at).toLocaleString()}
                          </time>
                        </p>
                      </div>

                      
                    </div>

                    <p className="mt-6 text-white">
                      {dream.description}
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                      <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Donar SOL {"0.03"}
                      </button>
                      <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Otra cantidad{" "}
                      </button>
                    </div>

                    

                    <div className="mt-10 border-t border-gray-200 pt-10">
                      <h3 className="text-sm font-medium text-white">Beneficios</h3>
                      {
                        dream.benefits.map((benefit, benefitIdx) => (
                          <div key={benefitIdx} className="mt-6">
                            <h4 className="text-sm font-medium text-white">
                              Donación mínima de {benefit.price} SOL
                            </h4>
                            <ul>
                              {
                                benefit.perks.map((perk, perkIdx) => (
                                  <li key={perkIdx} className="mt-2 text-sm text-white">
                                    {perk}
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        ))
                      }
                    </div>

                  </div>

                  <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                    <Tab.Group as="div">
                      <div className="border-b border-gray-200">
                        <Tab.List className="-mb-px flex space-x-8">
                          <Tab
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-white hover:border-gray-300 hover:text-white",
                                "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                              )
                            }
                          >
                            Backers{" "}
                          </Tab>
                          
                        </Tab.List>
                      </div>
                      <Tab.Panels as={Fragment}>
                        <Tab.Panel className="-mb-10">
                          <h3 >Backers</h3>

                          {reviews.featured.map((review, reviewIdx) => (
                            <div
                              key={review.id}
                              className="flex space-x-4 text-sm text-white"
                            >
                              <div className="flex-none py-10">
                                <Image
                                  src={review.avatarSrc}
                                  alt=""
                                  className="h-10 w-10 rounded-full bg-gray-100"
                                  width={200}
                                  height={100}
                                />
                              </div>
                              <div
                                className={classNames(
                                  reviewIdx === 0 ? "" : "border-t border-gray-200",
                                  "flex-1 py-10"
                                )}
                              >
                                <h3 className="font-medium text-white">
                                  {review.author}
                                </h3>
                                <p>
                                  <time dateTime={review.datetime}>
                                    {review.date}
                                  </time>
                                </p>

                                <div className="mt-4 flex items-center">
                                  {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                      key={rating}
                                      className={classNames(
                                        review.rating > rating
                                          ? "text-yellow-400"
                                          : "text-gray-300",
                                        "h-5 w-5 flex-shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                  ))}
                                </div>
                                <p className="sr-only">
                                  {review.rating} out of 5 stars
                                </p>

                                <div
                                  className="prose prose-sm mt-4 max-w-none text-white"
                                  dangerouslySetInnerHTML={{ __html: review.content }}
                                />
                              </div>
                            </div>
                          ))}
                        </Tab.Panel>

                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </div>

                {/* Related products */}
                <div className="mx-auto mt-24 max-w-2xl sm:mt-32 lg:max-w-none">
                  <div className="flex items-center justify-between space-x-4">
                    <h2 className="text-lg font-medium text-white">
                      Otros proyectos{" "}
                    </h2>
                    <a
                      href="#"
                      className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Ver todos <span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                    {relatedProducts.map((product) => (
                      <div key={product.id} className="group relative">
                        <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="object-cover object-center"
                            width={200}
                            height={100}
                          />
                          <div
                            className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                            aria-hidden="true"
                          >
                            <div className="w-full rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-white backdrop-blur backdrop-filter">
                              View Product
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-white">
                          <h3>
                            <a href="#">
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.name}
                            </a>
                          </h3>
                          <p>{product.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-white">{product.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </MainLayout>

            )
          }
        </div>
      </div>
    </>
  );
}
