import axios from "axios";

export default class CovidAPI{
    static async getCovidAffectedCountries(){
        return axios.get(
            "https://corona.lmao.ninja/v3/covid-19/countries"
          );
    }
    static async getCovidHistorical(){
        return axios.get(
            "https://corona.lmao.ninja/v3/covid-19/historical/all"
          );
    }
}