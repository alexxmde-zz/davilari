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

var ProductBox = React.createClass({
  getInitialState : function() {
    return {data: []};
  },

  componentDidMount : function () {
    $.ajax({
      url : this.props.url,
      dataType : 'json',
      cache : false,
      success : function (data) {
        this.setState({data : data});
      }.bind(this),
      error : function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render : function(){
    return (
      <div className="productBox ">
        <h1 className="title-product-box text-center">Produtos</h1>
        <ProductList products={this.state.data} />
      </div>
    );
    
  }
});

ReactDOM.render(<ProductBox url='/api/products' />, document.getElementById('content'));

