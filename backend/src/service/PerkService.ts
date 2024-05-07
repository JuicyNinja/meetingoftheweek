import { PerkRepository } from "../repositories";

export const fetchData = async (user_id: string) => {
    const perks = await PerkRepository.findByUserId(user_id);
    return perks;
}
