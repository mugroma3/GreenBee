package oggettijson;

public class RichiestaTransazione {

	private TipoTransazione tipoTransazione;
	private String oggetto;
	private int quantita;
	
	
	public RichiestaTransazione(TipoTransazione tipoTransazione, String oggetto, int quantita) {
	
		this.tipoTransazione = tipoTransazione;
		this.oggetto = oggetto;
		this.quantita = quantita;
	}
	
	
}
