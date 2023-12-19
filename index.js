const { createApp, ref, onMounted } = Vue;

const app = createApp({
	setup() {
		const apiUrl = "https://ec-course-api.hexschool.io/v2/api";
		const apiPath = "hexschool-billyji";
		const products = ref([]);
		const tempProduct = ref({ imagesUrl: [] });

		const getProducts = () => {
			const api = `${apiUrl}/${apiPath}/admin/products`;
			axios
				.get(api)
				.then((res) => {
					products.value = res.data.products;
				})
				.catch((error) => {
					console.log(error);
				});
		};
		const checkAdmin = () => {
			const api = `${apiUrl}/user/check`;
			axios
				.post(api)
				.then((res) => {
					getProducts();
				})
				.catch((error) => {
					alert(`無此頁面權限，請重新登入。錯誤碼：${error}`);
					window.location = "login.html";
				});
		};

		onMounted(() => {
			const token = document.cookie.replace(
				/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
				"$1"
			);

			axios.defaults.headers.common.Authorization = token;
			checkAdmin();
		});

		return {
			products,
			tempProduct,
		};
	},
});

app.mount("#app");
