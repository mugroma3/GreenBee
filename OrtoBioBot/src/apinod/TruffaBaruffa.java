package apinod;


import java.util.ArrayList;
import java.util.List;

import oggettijson.ItemMag;
import oggettijson.Punti;
import oggettijson.RichiestaTransazione;
import oggettijson.TipoTransazione;
import oggettijson.Transazione;

public class TruffaBaruffa extends APINod{

	public TruffaBaruffa(String tb) {
		super(tb);
	}
	
	

	@Override
	public boolean isNellOrto(long id) {
		return true;
	}

	@Override
	public boolean addIngresso(long id) {
		return true;
	}

	@Override
	public boolean addUscita(long id) {
		return true;
	}

	@Override
	public List<ItemMag> getMagazzino() {
		List<ItemMag> result = new ArrayList<ItemMag>();
		ItemMag t1=new ItemMag();
		ItemMag t2=new ItemMag();
		ItemMag t3=new ItemMag();
		ItemMag t4=new ItemMag();
		ItemMag t5=new ItemMag();
		
		t1.setId("t1");
		t1.setCosto(0);
		t1.setImmagine("");
		t1.setNome("Peperoni");
		t1.setQuantita(4);
		t1.setTelegramRefImg("");
		
		t2.setId("t2");
		t2.setCosto(0);
		t2.setImmagine("");
		t2.setNome("Pomodori");
		t2.setQuantita(15);
		t2.setTelegramRefImg("");
		
		t3.setId("t3");
		t3.setCosto(0);
		t3.setImmagine("");
		t3.setNome("Zucchine");
		t3.setQuantita(4);
		t3.setTelegramRefImg("");
		
		t4.setId("t4");
		t4.setCosto(0);
		t4.setImmagine("");
		t4.setNome("Carciofi");
		t4.setQuantita(10);
		t4.setTelegramRefImg("");
		
		t5.setId("t5");
		t5.setCosto(0);
		t5.setImmagine("");
		t5.setNome("Patate");
		t5.setQuantita(12);
		t5.setTelegramRefImg("");
		
		result.add(t1);
		result.add(t2);
		result.add(t3);
		result.add(t4);
		result.add(t5);
		
		return result;
	}

	@Override
	public List<Transazione> getStorico(long id) {
		
		List<Transazione> result = new ArrayList<Transazione>();
		Transazione t1,t2,t3,t4,t5;
		
		t1 = new Transazione();
		t2 = new Transazione();
		t3 = new Transazione();
		t4 = new Transazione();
		t5 = new Transazione();
		
		t1.setData("10 Ottobre 2016 10:25");
		t1.setOggetto("Pomodori");
		t1.setQuantita(4.0);
		t1.setTipoTransazione(TipoTransazione.vendo);
		
		t2.setData("10 Ottobre 2016 10:25");
		t2.setOggetto("Zucchine");
		t2.setQuantita(1.0);
		t2.setTipoTransazione(TipoTransazione.vendo);
		
		t3.setData("12 Ottobre 2016 17:45");
		t3.setOggetto("Peperoni");
		t3.setQuantita(1.0);
		t3.setTipoTransazione(TipoTransazione.acquisto);
		
		t4.setData("14 Ottobre 2016 10:25");
		t4.setOggetto("Cipolle");
		t4.setQuantita(2.0);
		t4.setTipoTransazione(TipoTransazione.acquisto);
		
		t5.setData("14 Ottobre 2016 13:25");
		t1.setOggetto("Patate");
		t1.setQuantita(24.0);
		t1.setTipoTransazione(TipoTransazione.vendo);
		
		result.add(t1);
		result.add(t2);		
		result.add(t3);
		result.add(t4);
		result.add(t5);
		
		return result;
	}
	
	@Override
	public Transazione addTransazione(long id, RichiestaTransazione rt)
	{
		Transazione result = new Transazione();
		result.setData("30 Febbraio 2030");
		result.setOggetto(rt.getOggetto());
		result.setQuantita(rt.getQuantita()+0.0);
		result.setTipoTransazione(rt.getTipoTransazione());
		
		return result;
	}
	
	@Override
	public Punti getPunti(long id)
	{
		Punti p = new Punti();
		p.setPunti(10000);
		return p;
	}

}
