import Model1 from "./UnitedNationsModels/model1";
import Model10 from "./UnitedNationsModels/model10";
import Model11 from "./UnitedNationsModels/model11";
import Model13 from "./UnitedNationsModels/model13";
import Model14 from "./UnitedNationsModels/model14";
import Model15 from "./UnitedNationsModels/model15";
import Model16 from "./UnitedNationsModels/model16";
import Model17 from "./UnitedNationsModels/model17";
import Model18 from "./UnitedNationsModels/model18";
import Model2 from "./UnitedNationsModels/model2";
import Model3 from "./UnitedNationsModels/model3";
import Model4 from "./UnitedNationsModels/model4";
import Model5 from "./UnitedNationsModels/model5";
import Model6 from "./UnitedNationsModels/model6";
import Model7 from "./UnitedNationsModels/model7";
import Model8 from "./UnitedNationsModels/model8";
import Model9 from "./UnitedNationsModels/model9";

const UnitedNationsModels = ({ categoryDetails }) => {
  if (!categoryDetails?.contents?.length) return null;

  return (
    <div className="space-y-[2.5rem]">
      {categoryDetails.contents.map((contentItem) => {
        switch (contentItem.model_id) {
          case 1:
            return <Model1 key={contentItem.id} data={contentItem} />;
          case 2:
            return <Model2 key={contentItem.id} data={contentItem} />;
          case 3:
            return <Model3 key={contentItem.id} data={contentItem} />;
          case 4:
            return <Model4 key={contentItem.id} data={contentItem} />;
          case 5:
            return <Model5 key={contentItem.id} data={contentItem} />;
          case 6:
            return <Model6 key={contentItem.id} data={contentItem} />;
          case 7:
            return <Model7 key={contentItem.id} data={contentItem} />;
          case 8:
            return <Model8 key={contentItem.id} data={contentItem} />;
          case 9:
            return <Model9 key={contentItem.id} data={contentItem} />;
          case 10:
            return <Model10 key={contentItem.id} data={contentItem} />;
          case 11:
            return <Model11 key={contentItem.id} data={contentItem} />;
          case 12:
            return <model12 key={contentItem.id} data={contentItem} />;
          case 13:
            return <Model13 key={contentItem.id} data={contentItem} />;
          case 14:
            return <Model14 key={contentItem.id} data={contentItem} />;
          case 15:
            return <Model15 key={contentItem.id} data={contentItem} />;
          case 16:
            return <Model16 key={contentItem.id} data={contentItem} />;
          case 17:
            return <Model17 key={contentItem.id} data={contentItem} />;
          case 18:
            return <Model18 key={contentItem.id} data={contentItem} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default UnitedNationsModels;
