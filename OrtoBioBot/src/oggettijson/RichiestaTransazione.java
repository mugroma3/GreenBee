package oggettijson;

public class RichiestaTransazione {

	private TipoTransazione tipoTransazione;
	public TipoTransazione getTipoTransazione() {
		return tipoTransazione;
	}


	public void setTipoTransazione(TipoTransazione tipoTransazione) {
		this.tipoTransazione = tipoTransazione;
	}


	public String getOggetto() {
		return oggetto;
	}


	public void setOggetto(String oggetto) {
		this.oggetto = oggetto;
	}


	public int getQuantita() {
		return quantita;
	}


	public void setQuantita(int quantita) {
		this.quantita = quantita;
	}


	private String oggetto;
	private int quantita;
	
	
	public RichiestaTransazione(TipoTransazione tipoTransazione, String oggetto, int quantita) {
	
		this.tipoTransazione = tipoTransazione;
		this.oggetto = oggetto;
		this.quantita = quantita;
	}
	
	
}
