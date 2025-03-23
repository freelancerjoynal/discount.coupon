import { Icon } from "@iconify/react";
import { Link } from "@inertiajs/react";

export const Shops = ({ shops, shop, setShop }) => {
    const handleSelectShop = (s) => {
        setShop(s);
    };

    return (
        <div className="flex w-full flex-col gap-6 font-['Varela_Round'] md:w-1/3 lg:w-1/3 lg:gap-10 xl:w-1/3 ">
            {shops
                ? shops
                      .filter((s) => s.id !== shop?.id)
                      .map((shop) => (
                          <Link
                              href={route("home")}
                              key={shop?.id}
                              type="button"
                              onClick={() => handleSelectShop(shop)}
                              className="flex items-center justify-end gap-4 lg:gap-6 "
                          >
                              <h4 className="text-2xl font-[400] tracking-[-1px] text-[#ffffff]">
                                  {shop?.name}
                              </h4>
                              {/* Cup Icon */}
                              <div className="h-10 w-10 rounded-full bg-[#ffffff] p-2 lg:h-14 lg:w-14">
                                  <Icon
                                      icon="bi:cup"
                                      className="h-full w-full"
                                  />
                              </div>
                          </Link>
                      ))
                : ""}
        </div>
    );
};
