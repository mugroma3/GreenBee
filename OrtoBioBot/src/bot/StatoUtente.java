package bot;

import gestionelingue.Lingue;

public class StatoUtente {

	private SezioniBot sezione;
	private int pagina;
	private Lingue lingua;
	
	
	public StatoUtente() 
	{
		this.sezione = SezioniBot.SCEGLILINGUA;
		this.pagina = 0;
		this.lingua = Lingue.ITALIANO;
	}
	
	public SezioniBot getSezione() 
	{
		return sezione;
	}
	public void setSezione(SezioniBot sezione) 
	{
		this.sezione = sezione;
	}
	public int getPagina() 
	{
		return pagina;
	}
	public void setPagina(int pagina)
	{
		this.pagina = pagina;
	}

	public Lingue getLingua() 
	{
		return lingua;
	}

	public void setLingua(Lingue lingua) 
	{
		this.lingua = lingua;
	}
	
	
	
}
