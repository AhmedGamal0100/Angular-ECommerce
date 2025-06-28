import { patchState, signalStore, watchState, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { IProducts } from '../interface/products'
import { computed, effect } from '@angular/core'

// function wishInLocal() {
//     const wishListStr = localStorage.getItem('wishList');
//     if (wishListStr !== null || wishListStr) {
//         return JSON.parse(wishListStr);
//     } else {
//         return [];
//     }
// }

const initialWishList: IProducts[] = [];
export const WishListStore = signalStore(
    { providedIn: 'root' },
    withState({
        wishList: initialWishList,
    }),

    withComputed((state) => ({
        wishListTotal: computed(() => state.wishList().length)
    })),

    withMethods((state) => ({
        addToWishList: (newObj: IProducts) => patchState(state, {
            wishList: [...state.wishList(), newObj]
        }),
        removeFromWishList: (deleteObj: IProducts) => patchState(state, {
            wishList: state.wishList().filter(obj => obj.id !== deleteObj.id)
        }),
        addListToWishList: (list: IProducts[]) => patchState(state, {
            wishList: list
        }),
        isProductsInWish: (product: IProducts): boolean => {
            return state.wishList().some(item => item.id == product.id)
        }
    })),

    withHooks({
        onInit(store) {
            const wishListStr = localStorage.getItem('wishList');
            if (wishListStr !== null || wishListStr) {
                store.addListToWishList(JSON.parse(wishListStr));
            }

            effect(() => {
                const wishList = store.wishList();
                localStorage.setItem("wishList", JSON.stringify(wishList))
            })

            const watcher = watchState(store, (state) => {
                console.log("New Item Added");
            });

            return () => watcher.destroy();
        },
    })
)
