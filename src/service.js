class SpaceXservice {
  async getResourse(url) {
    const res = await fetch(`${url}`);
    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  }
  getData() {
    return this.getResourse("https://api.spacexdata.com/v3/launches/latest");
  }

  //   getRocket() {
  //     return this.getResourse("https://api.spacexdata.com/v3/launches/latest");
  //   }
  //   getDescription() {
  //     return this.getResourse("https://api.spacexdata.com/v3/launches/latest");
  //   }
}
export default SpaceXservice;
