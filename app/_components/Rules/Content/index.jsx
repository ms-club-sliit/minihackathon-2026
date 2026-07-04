"use client";
import Image from "next/image";
import sections from "@/app/data/rules/rules";

// Import the same images used in Timeline
const elementImages = [
  "/assets/1.png",
  "/assets/2.png",
  "/assets/3.png",
  "/assets/4.png",
];

export default function Content() {

  const Table = ({ head, body }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 ml-0 lg:ml-20">
        <thead className="bg-gray-50">
          <tr>
            {head.map((header, index) => (
              <th key={`header-${index}`} className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {body.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell-${rowIndex}-${cellIndex}`} className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const NestedTable = ({ head, body }) => (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        <table className="min-w-full divide-y divide-gray-200 ml-0 lg:ml-20">
          <thead className="bg-gray-50">
            <tr>
              {head.map((header, index) => (
                <th
                  key={`header-${index}`}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {body.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                <td className="px-4 py-2 text-sm text-gray-500 font-semibold">{row.criteria}</td>
                <td className="px-4 py-2 text-md text-gray-500">
                  <ul className="list-disc pl-4">
                    {row.description.map((desc, descIndex) => (
                      <li key={`desc-${rowIndex}-${descIndex}`}>{desc}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CategoryList = ({ categories }) => {
    // Group categories by their main category
    const groupedCategories = categories.reduce((acc, category) => {
      const mainCategory = category.category || 'Other';
      if (!acc[mainCategory]) {
        acc[mainCategory] = [];
      }
      acc[mainCategory].push(category);
      return acc;
    }, {});

    return (
      <div className="space-y-6">
        {Object.entries(groupedCategories).map(([mainCategory, categoryItems]) => (
          <div key={mainCategory}>
            {/* Main Category Header */}
            <h2 className="text-2xl font-bold mb-4 text-left">
              {mainCategory}
            </h2>
            
            {/* Category Items */}
            <div className="space-y-6">
              {categoryItems.map((category, index) => (
                <div key={`${mainCategory}-${index}`} className="bg-white shadow-md rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-left">
                    {index + 1}. {category.name}
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-left">
                    {category.content.map((item, itemIndex) => (
                      <li key={`item-${mainCategory}-${index}-${itemIndex}`} className="text-gray-700 text-base">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-screen relative">
      {/* Decorative corner images like Timeline */}
      <div aria-hidden className="pointer-events-none select-none absolute inset-0 -z-10">
        <Image src={elementImages[0]} alt="" width={100} height={100} className="absolute top-36 left-0 w-24 md:w-36 opacity-70" priority />
        <Image src={elementImages[1]} alt="" width={100} height={100} className="absolute bottom-0 right-0 w-28 md:w-48 opacity-70" priority />
        <Image src={elementImages[2]} alt="" width={100} height={100} className="absolute bottom-8 left-0 w-20 md:w-48 opacity-70" priority />
        <Image src={elementImages[3]} alt="" width={100} height={100} className="absolute top-36 right-0 w-24 md:w-40 opacity-70" priority />
      </div>

      <div className="container mx-auto text-justify text-[#161414] px-6 md:px-12 lg:px-20">
        {sections && Array.isArray(sections) ? (
          sections.map((section, index) => (
            <div key={`round-${section.title}-${index}`} className="my-10">
              <h3 className="text-lg lg:text-2xl font-bold text-center lg:text-left uppercase mb-5">
                {section.title}
              </h3>

              {section.content && (
                <p className="text-[#334155] text-base lg:text-lg my-5">
                  {section.content}
                </p>
              )}

              {section.table && <Table head={section.table.head} body={section.table.body} />}
              {section.nestedTable && <NestedTable head={section.nestedTable.head} body={section.nestedTable.body} />}
              {section.list && (
                <ul className="list-disc text-[#334155] text-base lg:text-lg my-5 pl-5 lg:pl-10">
                  {section.list.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              )}
              {section.note && <p className="text-base lg:text-lg text-[#334155] font-semibold my-10 italic">{section.note}</p>}
              {section.content2 && <p className="text-[#334155] text-base lg:text-lg my-5">{section.content2}</p>}

              {/* Added rounds */}
              {section.rounds && section.rounds.map((round, rIndex) => (
                <div key={`round-${rIndex}`} className="my-10">
                  <h3 className="text-xl lg:text-2xl font-bold my-5 text-center lg:text-left lg:pl-20">
                    {round.title}
                  </h3>
                  <div className="text-[#334155] text-base lg:text-lg lg:pl-20 mx-10 lg:mx-0">
                    {round.content.map((contentItem, cIndex) => (
                      <p key={`content-${rIndex}-${cIndex}`} className="mb-2">{contentItem}</p>
                    ))}

                    {round.list && (
                      <ul className="list-disc text-[#334155] text-base lg:text-lg pl-10 lg:pl-20 my-5">
                        {round.list.map((listItem, lIndex) => <li key={`list-item-${rIndex}-${lIndex}`}>{listItem}</li>)}
                      </ul>
                    )}

                    {round.categories && <CategoryList categories={round.categories} />}
                    
                    {round.advancement && (
                      <>
                        <h4 className="mt-10 font-bold">{round.advancement.title}</h4>
                        <p>{round.advancement.content}</p>
                        {round.advancement.note && (
                          <p className="font-semibold my-10 italic">{round.advancement.note}</p>
                        )}
                      </>
                    )}

                    {round.content2 && <p className="mb-2">{round.content2}</p>}
                  </div>
                </div>
              ))}

              {/* Added prizes */}
              {section.prizes && section.prizes.map((prize, pIndex) => (
                <div key={`prize-${pIndex}`} className="text-base lg:text-lg text-[#334155] lg:pl-20 mx-10 lg:mx-0">
                  <p>
                    <span className="font-semibold">{prize.place}</span>:
                    <span>{prize.description}</span>{' '}
                    <span className="font-semibold">{prize.reward}</span>
                  </p>
                </div>
              ))}

            </div>
          ))
        ) : (
          <h1 className="text-2xl text-center mt-10 font-semibold">No sections available</h1>
        )}
      </div>
    </div>
  );
}