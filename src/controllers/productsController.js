const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", {
			product: products
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let elId = req.params.id;
		let productos = products.find(unProducto => {
			if (unProducto.id == elId) {
				return unProducto;
			}

		});
		res.render('detail', { productos })
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");


		// Do the magic
	},

	// Create -  Method to store
	store: (req, res) => {

		const { name, price, discount, category, description } = req.body;

		let cantidadProductos = 0;
		for (let i = 0; i < products.length; i++) {

		// 	if( products.id > cantidadProductos ){	

		// 		cantidadProductos = products.id 
		// 	} 
				
		// }
		cantidadProductos = cantidadProductos +1;
		}
		
		const data = {
			id : cantidadProductos,
			name: name,
			price : price,
			discount : discount,
			category : category,
			description : description
		};
		products.push(data);

		fs.writeFileSync(productsFilePath,JSON.stringify(products),'utf-8');
res.redirect("/");

	// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {

		let elId = req.params.id;
	 	let productos = products.find(unProducto => {
	 		if (unProducto.id == elId) {
	 			return unProducto;
	 		}
	 	 });
	 	res.render('product-edit-form', { productos })
	


	 	// Do the magic
	 },
	// Update - Method to update
	update: (req, res) => {

		const {name, price, discount, category, description } = req.body;
		const elId = req.params.id;
		const productoNuevo = [];

	products.map(data=> {

		if(data.id == elId){

			data.name = name,
			data.price = price,
			data.discount = discount,
			data.category = category,
			data.description = description

		}
		productoNuevo.push(data);
	});

		fs.writeFileSync(productsFilePath,JSON.stringify(products),'utf-8');
res.redirect("/");


	// Do the magic
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		let idProducto = req.params.id;
		const productoEliminado = [];
		//  products=products.filter(unProducto => {
		// 	return unProducto.id != idProducto;
		
		products.map(data=> {
			if(data.id != idProducto){

				productoEliminado.push(data);
			}	
		})
		
		fs.writeFileSync(productsFilePath,JSON.stringify(productoEliminado),'utf-8');
		res.redirect("/");
		// Do the magic
	}
};


module.exports = controller;