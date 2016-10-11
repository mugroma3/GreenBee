package bot;

import java.util.List;

import gestionelingue.Lingue;
import oggettijson.ItemMag;

public class StatoUtente {

	private SezioniBot sezione;
	private int pagina = 0;
	private Lingue lingua = Lingue.ITALIANO;
	private boolean inOrto = false;
	private List<ItemMag> magazzino;
	public StatoUtente() 
	{
		this.sezione = SezioniBot.SCEGLILINGUA;
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

	public boolean isInOrto() 
	{
		return inOrto;
	}

	public void setInOrto(boolean inOrto) 
	{
		this.inOrto = inOrto;
	}

	public List<ItemMag> getMagazzino() {
		return magazzino;
	}

	public void setMagazzino(List<ItemMag> magazzino) {
		this.magazzino = magazzino;
	}
	
	
}
