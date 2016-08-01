var products = [
  {id : "1", name : "Conjunto Guaruja", price : "3000", mainImage : "/resources/img/conjunto-peruibe.jpg"}
];

var Product = React.createClass({
  render: function () {
    return(
      <div className="product col-sm-4">
        <div className="img-box text-center">
        <img className="img-product" src={"/resources/img/products/" + this.props.mainImage} />
      </div>
      <div className="info-box col-xs-12">
        <h2 className="title-product">{this.props.name}</h2>
        <h3 className="price-product">{"R$"+this.props.price+",00"}</h3>
      </div>
      </div>);

  }
});

var ProductList = React.createClass({
  render: function () {
    var productNodes = this.props.products.map(function(prod){
      return (
        <Product name={prod.name} price={prod.price} mainImage={prod.mainImage} />
      );
    });
    return (
      <div className="productList">
        {productNodes}
      </div>
    );
  }
});

var Category = React.createClass({
  render: function() {
    return (
      <div className="category col-xs-12 col-sm-3">
        <div className="category-button">
        {this.props.name}
      </div>
      </div>
    );
  }
});

var CategoryList = React.createClass({
  render: function () {

    var categoryNodes = this.props.categories.map(function(cat) {
      return (
        <Category name={cat.name} id={cat._id} />
      );
    });
    return (<div className="category-list col-xs-12">
      {categoryNodes}
      
    </div>);
  }
});

var ProductBox = React.createClass({
  getInitialState : function() {
    return {products: [], categories : []};
  },

  componentDidMount : function () {

     $.ajax({
      url : this.props.categoriesUrl,
      dataType : 'json',
      cache : false,
      success : function (data) {
        this.setState({categories: data});
      }.bind(this),
      error : function(xhr, status, err) {
        console.error(this.props.categoriesUrl, status, err.toString());
      }.bind(this)
    });

    $.ajax({
      url : this.props.productsUrl,
      dataType : 'json',
      cache : false,
      success : function (data) {
        this.setState({products : data});
      }.bind(this),
      error : function(xhr, status, err) {
        console.error(this.props.productsUrl, status, err.toString());
      }.bind(this)
    });

  
  },

  render : function(){
    return (
      <div className="productBox ">
        <h1 className="title-product-box text-center">Produtos</h1>
        <CategoryList categories={this.state.categories} />
        <ProductList products={this.state.products} />
      </div>
    );
  }
});

ReactDOM.render(<ProductBox categoriesUrl="/api/categories" productsUrl='/api/products' />, document.getElementById('index-content'));

