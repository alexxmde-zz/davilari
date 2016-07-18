function Utils(){
  this.parseBin = function parseBin (value) {
    if (value !== "on" || !value)
      return 0;
    else
      return 1;
        
    
  }
}

module.exports = new Utils();
