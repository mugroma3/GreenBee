package bot;

import java.util.List;

import gestionelingue.English;
import gestionelingue.Italiano;
import gestionelingue.Lingue;
import oggettijson.ItemMag;

public class StatoUtente {

	private SezioniBot sezione;
	private int paginaMagazzino = 0;
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
		return paginaMagazzino;
	}

	public int paginaMagAvanti()
	{
		paginaMagazzino++;
		paginaMagazzino = Math.min(magazzino.size() / NumericKeyboardFactory.PAGESIZE, paginaMagazzino);
		return paginaMagazzino;
	}
	
	public int paginaMagIndietro()
	{
		paginaMagazzino--;
		paginaMagazzino = Math.max(0, paginaMagazzino);
		return paginaMagazzino;
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
		paginaMagazzino = 0;
	}
	
	
	public String[] buildItemMagStringArray()
	{
		if(magazzino.size() == 0)
			return new String[0];
		
		int begin = paginaMagazzino * NumericKeyboardFactory.PAGESIZE;
		int end = Math.min(begin + 4, magazzino.size());
		int len = Math.min(end - begin, 4);
		String [] ask = new String[len];
		int c = 0;
		
		String quant = Italiano.QUANTITA;
		String cost = Italiano.ALCOSTO;
		
		if(lingua == Lingue.INGLESE)
		{
			quant = English.AMOUNT;
			cost = English.ALCOSTO;
		}
		
		for(int i = begin; i < end && c < 4; i++)
		{
			ask[c] = magazzino.get(i).getNome() + " " + quant + magazzino.get(i).getQuantita() +" "+ cost + magazzino.get(i).getCosto();
			c++;
		}
		return ask;
	}
	
}
