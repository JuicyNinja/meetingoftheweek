import { usePerkListHook } from "./hook";
import { IPerkListProps } from "../../types/perk";
import PerkCard from "./Card";

const PerkList: React.FC<IPerkListProps> = (props) => {
  const user_id = props?.user_id;
  const {data: perks} = usePerkListHook(user_id);
  return (
    <div style={{ width: "100%" }}>
        {
            perks && Array.isArray(perks) && perks.map((perk, index) => (
                <PerkCard perk={perk} key={index}/>
            ))
        }
    </div>
  );
};
export default PerkList;