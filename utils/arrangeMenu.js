import { setImagesURLs } from "./setImagesURLs"
import formatDate from "./formatDate"

async function arrangeMenu(data, category, menu) {
    // const img = await setImagesURLs(data.img)

    // const start = data.promoData?.start ? new Date(data.promoData.start.toDate()) : null
    // const end = data.promoData?.end ? new Date(data.promoData.end.toDate()) : null
    // const day = data.promoData?.day ? data.promoData.day : null
    // const actualDate = new Date()
    // const actualDay = actualDate.toLocaleString('es-ES', { weekday: 'long' })

    // const isToday = day ? actualDay === day : null;
    // const isInRange = (start && end) && (start <= actualDate && end >= actualDate)

    // let endDate: string | null = "";
    // let discountedPrice = 1;

    // if (data.promo && data.promoData) {
    //     endDate = formatDate(data.promoData.end);
    //     if (data.promoData.discount) {
    //         discountedPrice = parseFloat((data.price - (data.promoData.discount * data.price) / 100).toFixed(2));
    //     }
    // }

    const promoData = {
        day,
        isToday,
        isInRange,
        discountedPrice,
        endDate,
        discount: data.promoData?.discount ? data.promoData.discount : null
    }

    return {
        ...menu,
        [category]: {
            ...menu[category],
            [data.id]: {
                ...data,
                img,
                promoData
            }
        }
    }
}

export default arrangeMenu
