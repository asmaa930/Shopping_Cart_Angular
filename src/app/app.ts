import { Component, computed, signal, WritableSignal } from '@angular/core';

import { Product } from './models/product.model';

@Component({
    imports: [],
    selector: 'app-root',
    styleUrl: './app.scss',
    templateUrl: './app.html',
})

export class App {

    //* _____________________ Properties _____________________

    public products: WritableSignal<Product[]> = signal<Product[]>([
        { id: 1, name: 'Controller', price: 300, quantity: 1, img: 'controller.png' },
        { id: 2, name: 'Headphones', price: 200, quantity: 1, img: 'headphones.png' },
        { id: 3, name: 'Laptop', price: 800, quantity: 1, img: 'laptop.png' },
        { id: 4, name: 'Mouse', price: 150, quantity: 1, img: 'mouse.png' },
        { id: 5, name: 'Smart Watch', price: 250, quantity: 1, img: 'smart_watch.png' },
        { id: 6, name: 'iPad', price: 700, quantity: 1, img: 'ipad.png' },
        { id: 7, name: 'Camera', price: 320, quantity: 1, img: 'camera.png' },
        { id: 8, name: 'Clock', price: 120, quantity: 1, img: 'clock.png' },
    ]);


    public totalItems = computed(() => {

        return this.products().reduce((total, product) => {
            return total + product.quantity;
        }, 0);

    });

    public totalPrice = computed(() => {

        return this.products().reduce((total, product) => {
            return total + (product.quantity * product.price);
        }, 0);

    });

    //* _____________________ Methods _____________________

    public incrementProduct(productId: number) {

        this.products.update((val) => {

            return val.map((product) => {

                if (product.id == productId) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }

            });
        });
    }

    //* _____________________

    public decrementProduct(productId: number) {
        this.products.update((val) => {

            return val.map((product) => {

                if (product.id == productId && product.quantity > 1) {
                    product.quantity--;
                    return product;
                } else {
                    return product;
                }
            });
        });
    }

    //* _____________________

    public removeProduct(productId: number, productEle: HTMLElement) {

        productEle.closest('.product')?.classList.add('remove');

        setTimeout(() => {
            this.products.update((val) => {

                return val.filter((product) => {
                    return product.id != productId;
                });
            });
        }, 500);

    }

}
