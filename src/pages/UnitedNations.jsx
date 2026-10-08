import { useState, useEffect } from "react";
import UnitedNationCategories from "../features/UnitedNations/component/unitedNationCategories";
import {
  useFetchUnitedNationCategory,
  useFetchUnitedNationCategoryId,
} from "../features/UnitedNations/hook/useFetchUnitedNation";
import UnitedNationsModels from "../features/UnitedNations/component/unitedNationsModels";
import Loader from "../component/loader/loader";
import ScrollToTop from "../component/scrollToTop/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";
import MetaHelmet from "../component/metaHelmet/metaHelmet";

const UnitedNations = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const {
    data: unitedNationCategoryData,
    isLoading: unitedNationCategoryDataLoading,
  } = useFetchUnitedNationCategory();

  // Set default id when categories load
  useEffect(() => {
    if (unitedNationCategoryData?.data?.length) {
      setSelectedCategoryId(
        (prev) => prev ?? unitedNationCategoryData.data[0].id,
      );
    }
  }, [unitedNationCategoryData]);

  // 👇 This re-runs whenever selectedCategoryId changes
  const {
    data: categoryDetails,
    isLoading: categoryDetailsLoading,
    error,
  } = useFetchUnitedNationCategoryId(selectedCategoryId);
  const combinedLoading =
    unitedNationCategoryDataLoading || categoryDetailsLoading;
  if (combinedLoading) {
    return <Loader />;
  }
  return (
    <div>
      <ScrollToTop />
      <HelmetProvider>
        <MetaHelmet title={"united_nations"} description={"united_nations"} />
        <div className="container4 mx-auto lg:mt-[3rem] mt-[0.9rem]">
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-x-[2rem] gap-y-[2rem] lg:gap-y-0">
            <div className="lg:col-span-3 col-span-1">
              <UnitedNationCategories
                unitedNationCategoryData={unitedNationCategoryData}
                activeId={selectedCategoryId}
                onSelect={setSelectedCategoryId}
              />
            </div>
            <div className="lg:col-span-9 col-span-1 space-y-[2.5rem]">
              <UnitedNationsModels categoryDetails={categoryDetails} />
            </div>
          </div>
        </div>
      </HelmetProvider>
    </div>
  );
};

export default UnitedNations;
