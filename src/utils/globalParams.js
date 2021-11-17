class GlobalParams {
    constructor() {
      this.id = null;
    }
    userId = (id)=>{
      if(!id) return this.id;
      this.id = id;
    }
  }
  const instance = new GlobalParams()
  export default instance;