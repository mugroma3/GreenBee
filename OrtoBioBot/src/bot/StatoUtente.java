package bot;

import java.util.List;

import gestionelingue.English;
import gestionelingue.Italiano;
import gestionelingue.Lingue;
import oggettijson.ItemMag;
import oggettijson.TipoTransazione;
import oggettijson.Transazione;

public class StatoUtente {

	private SezioniBot sezione;
	private Lingue lingua = Lingue.ITALIANO;
	private boolean inOrto = false;
	private ItemMag selezionato;
	private GestorePagine<ItemMag> magazzino;
	private GestorePagine<Transazione> storicoM; 
	
	public StatoUtente() 
	{
		this.sezione = SezioniBot.SCEGLILINGUA;
		magazzino = new GestorePagine<>();
		storicoM = new GestorePagine<>();
	}
	
	public SezioniBot getSezione() 
	{
		return sezione;
	}
	public void setSezione(SezioniBot sezione) 
	{
		this.sezione = sezione;
	}

	public int paginaStoricoAvanti()
	{
		return storicoM.paginaAvanti();
	}
	
	public int paginaMagAvanti()
	{
		return magazzino.paginaAvanti();
	}
	
	public int paginaMagIndietro()
	{
		return magazzino.paginaIndietro();
	}
	
	public int paginaStoricoIndietro()
	{
		return storicoM.paginaIndietro();
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
		return magazzino.getRaccoglitore();
	}

	public List<Transazione> getStorico()
	{
		return storicoM.getRaccoglitore();
	}
	public void setMagazzino(List<ItemMag> mag) {
		int i = 0;
		while(i < mag.size())
		{
			if(mag.get(i).getQuantita() == 0)
				mag.remove(i);
			else
			    i++;
		}
		this.magazzino.setRaccoglitore(mag);
	}
	
	public void setStorico(List<Transazione> sto)
	{
		storicoM.setRaccoglitore(sto);
	}
	
	public ItemMag getItemMagFromIndexPage(int index)
	{
		return magazzino.getItemMagFromInexPage(index);
	}
	
	public Transazione getItemStoriFromIndexPage(int index)
	{
		return storicoM.getItemMagFromInexPage(index);
	}
	
	public String[] buildItemMagStringArray()
	{
		if(magazzino.size() == 0)
			return new String[0];
		int begin = magazzino.getPagina() * NumericKeyboardFactory.PAGESIZE;
		int end = Math.min(begin + NumericKeyboardFactory.PAGESIZE, magazzino.size());
		int len = Math.min(end - begin, NumericKeyboardFactory.PAGESIZE);
		String [] ask = new String[len];
		int c = 0;
		String quant = Italiano.QUANTITA;
		String cost = Italiano.ALCOSTO;
		
		if(lingua == Lingue.INGLESE)
		{
			quant = English.AMOUNT;
			cost = English.ALCOSTO;
		}
		
		for(int i = begin; i < end && c < NumericKeyboardFactory.PAGESIZE; i++)
		{
			ask[c] = magazzino.get(i).getNome() + " " + quant + magazzino.get(i).getQuantita() +" "+ cost + magazzino.get(i).getCosto();
			c++;
		}
		return ask;
	}

	
	public String[] buildItemStocStringArray()
	{
		if(storicoM.size() == 0)
			return new String[0];
		int begin = storicoM.getPagina() * NumericKeyboardFactory.PAGESIZE;
		int end = Math.min(begin + NumericKeyboardFactory.PAGESIZE, storicoM.size());
		int len = Math.min(end - begin, NumericKeyboardFactory.PAGESIZE);
		String [] ask = new String[len];
		int c = 0;
		String hai = Italiano.HAI;
		String comprato = Italiano.COMPRATO;
		String venduto = Italiano.VENDUTO;
		String kg = Italiano.KGDI;
		
		if(lingua == Lingue.INGLESE)
		{
			hai = English.HAI;
			comprato = English.COMPRATO;
			venduto = English.VENDUTO;
		    kg = English.KGDI;
		}
		
		for(int i = begin; i < end && c < NumericKeyboardFactory.PAGESIZE; i++)
		{
			Transazione tr = storicoM.get(i);
			String azione = comprato;
			if(tr.getTipoTransazione() == TipoTransazione.vendo)
				azione = venduto;
			ask[c] = hai + azione + tr.getQuantita() + kg + tr.getOggetto();
			c++;
		}
		return ask;
	}
	
	
	public ItemMag getSelezionato() {
		return selezionato;
	}

	public void setSelezionato(ItemMag selezionato) {
		this.selezionato = selezionato;
	}
	
	
	
}
