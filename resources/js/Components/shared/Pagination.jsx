import { useEffect, useMemo, useState } from "react";

export const Pagination = ({
    total,
    pageSize,
    handlePageChange,
    pageNumber,
    SearchFilterBox,
}) => {
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const [currentPageValue, setCurrentPageValue] = useState(pageSize);
    const totalCount = total;
    const [customPage, setCustomPage] = useState("");

    var siblingCount = 2;

    // range detecting
    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    };

    const Pagenum = () => {
        const paginationRange = useMemo(() => {
            var DOTS = "...";
            const totalPageCount = Math.ceil(totalCount / currentPageValue);

            const totalPageNumbers = siblingCount + 5;

            if (totalPageNumbers >= totalPageCount) {
                return range(1, totalPageCount);
            }

            /*
                Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
            */
            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
            const rightSiblingIndex = Math.min(
                currentPage + siblingCount,
                totalPageCount
            );
            /*
              We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
            */
            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

            const firstPageIndex = 1;
            const lastPageIndex = totalPageCount;

            // /*
            //     Case 1: No left dots to show, but right dots to be shown
            if (!shouldShowLeftDots && shouldShowRightDots) {
                let leftItemCount = 3 + 2 * siblingCount;
                let leftRange = range(1, leftItemCount);

                return [...leftRange, DOTS, totalPageCount];
            }

            // /*
            //     Case 3: No right dots to show, but left dots to be shown
            // */
            if (shouldShowLeftDots && !shouldShowRightDots) {
                let rightItemCount = 3 + 2 * siblingCount;
                let rightRange = range(
                    totalPageCount - rightItemCount + 1,
                    totalPageCount
                );
                return [firstPageIndex, DOTS, ...rightRange];
            }

            // /*
            //     Case 4: Both left and right dots to be shown
            // */
            if (shouldShowLeftDots && shouldShowRightDots) {
                let middleRange = range(leftSiblingIndex, rightSiblingIndex);
                return [
                    firstPageIndex,
                    DOTS,
                    ...middleRange,
                    DOTS,
                    lastPageIndex,
                ];
            }
        }, [totalCount, currentPageValue, siblingCount, currentPage]);

        return paginationRange;
    };

    const handleOptionChange = (e) => {
        // setCurrentPageValue(Number(e.target.value))
        handlePageChange(currentPage, Number(e.target.value));
    };

    const pageCalling = (page) => {
        if (typeof page != "number") return;
        setCurrentPage(page);
        handlePageChange(page, currentPageValue);
    };

    const previousCalling = (number) => {
        if (currentPage > 1) {
            pageCalling(currentPage - number);
        }
    };
    const nextCalling = (number) => {
        if (currentPage < Math.ceil(totalCount / currentPageValue)) {
            pageCalling(currentPage + number);
        }
    };

    const setCustomPageHandle = () => {
        if (customPage == "") return;
        let num = Number(customPage);
        setCustomPage("");
        if (num > Math.ceil(totalCount / currentPageValue)) return;
        if (num < 1) return;
        pageCalling(num);
    };

    useEffect(() => {
        setCurrentPage(pageNumber);
        setCurrentPageValue(pageSize);
    }, [pageNumber, pageSize]);

    const previousATagStyle =
        "relative inline-flex items-center px-4 py-2 border text-md font-medium bg-white text-gray-700 rounded-l-[10px] hover:bg-[rgb(253,208,23)] hover:text-black transition-colors duration-200";
    const dynamicATagStyle =
        "bg-white text-gray-700 hover:bg-[rgb(253,208,23)] hover:text-black transition-colors duration-200";
    const nextStyle =
        "relative inline-flex items-center px-2 py-2 border text-md font-medium rounded-r-[10px] bg-white text-gray-700 hover:bg-[rgb(253,208,23)] hover:text-black transition-colors duration-200";
    const currentPageButtonStyle = "bg-[rgb(253,208,23)] text-black";
    const renderPageNumbers = Pagenum()?.map((number, i) => {
        return (
            <li key={i}>
                <button
                    className={`${
                        currentPage === number
                            ? currentPageButtonStyle
                            : dynamicATagStyle
                    }  text-md relative inline-flex items-center border px-4 py-2 font-medium`}
                    onClick={() => pageCalling(number)}
                >
                    {number}
                </button>
            </li>
        );
    });

    return (
        <>
            <div className="mx-auto w-full overflow-x-auto lg:flex lg:items-center lg:justify-between">
                <div className="flex items-center justify-center">
                    {/* showing page of  */}
                    <span className="text-md mr-5 text-gray-500">
                        Showing page{" "}
                        <span className="font-bold">{currentPage}</span> of{" "}
                        <span className="font-bold">
                            {Math.ceil(totalCount / currentPageValue)}
                        </span>
                    </span>{" "}
                    |{/* showing total data */}
                    <span className="text-md ml-5 text-gray-700">
                        Total Records:{" "}
                        <span className="font-bold">{totalCount}</span>{" "}
                    </span>
                </div>

                <nav className="">
                    <ul className="mt-5 flex justify-center lg:mt-0">
                        <li className="mr-2">{SearchFilterBox}</li>
                        <li>
                            <button
                                className={previousATagStyle}
                                onClick={() => previousCalling(1)}
                            >
                                Previous
                            </button>
                        </li>
                        {renderPageNumbers}
                        <li>
                            <button
                                className={nextStyle}
                                onClick={() => nextCalling(1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};
