const loaderMethods = {
    show() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('show');
        }
    },
    hide() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.remove('show');
        }
    }
}

export default loaderMethods;