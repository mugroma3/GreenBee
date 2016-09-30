package oggettijson;

public class Transazione {

	private String tipoTransazione;
	private String oggetto;
	private Double quantita;
	private String id;
	private String data;
	/**
	*
	* @return
	* The tipoTransazione
	*/
	public String getTipoTransazione() {
	return tipoTransazione;
	}

	/**
	*
	* @param tipoTransazione
	* The tipoTransazione
	*/
	public void setTipoTransazione(String tipoTransazione) {
	this.tipoTransazione = tipoTransazione;
	}

	/**
	*
	* @return
	* The oggetto
	*/
	public String getOggetto() {
	return oggetto;
	}

	/**
	*
	* @param oggetto
	* The oggetto
	*/
	public void setOggetto(String oggetto) {
	this.oggetto = oggetto;
	}

	/**
	*
	* @return
	* The quantita
	*/
	public Double getQuantita() {
	return quantita;
	}

	/**
	*
	* @param quantita
	* The quantita
	*/
	public void setQuantita(Double quantita) {
	this.quantita = quantita;
	}

	/**
	*
	* @return
	* The id
	*/
	public String getId() {
	return id;
	}

	/**
	*
	* @param id
	* The _id
	*/
	public void setId(String id) {
	this.id = id;
	}

	/**
	*
	* @return
	* The data
	*/
	public String getData() {
	return data;
	}

	/**
	*
	* @param data
	* The Data
	*/
	public void setData(String data) {
	this.data = data;
	}
}
