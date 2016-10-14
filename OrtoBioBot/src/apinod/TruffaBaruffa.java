package apinod;


import java.util.ArrayList;
import java.util.List;

import com.google.gson.reflect.TypeToken;

import oggettijson.ItemMag;
import oggettijson.Punti;
import oggettijson.RichiestaTask;
import oggettijson.RichiestaTransazione;
import oggettijson.Task;
import oggettijson.TipoTransazione;
import oggettijson.Transazione;

public class TruffaBaruffa extends APINod{

	List<ItemMag> resultMag;
	List<Transazione> resultTrans;
	Punti p;

	public TruffaBaruffa(String tb) {
		super(tb);
		
		resultMag = new ArrayList<>();
		resultTrans = new ArrayList<>();
		
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

		this.resultMag.add(t1);
		this.resultMag.add(t2);
		this.resultMag.add(t3);
		this.resultMag.add(t4);
		this.resultMag.add(t5);


		Transazione tr1,tr2,tr3,tr4,tr5;

		tr1 = new Transazione();
		tr2 = new Transazione();
		tr3 = new Transazione();
		tr4 = new Transazione();
		tr5 = new Transazione();

		tr1.setData("10 Ottobre 2016 10:25");
		tr1.setOggetto("Pomodori");
		tr1.setQuantita(4.0);
		tr1.setTipoTransazione(TipoTransazione.vendo);

		tr2.setData("10 Ottobre 2016 10:25");
		tr2.setOggetto("Zucchine");
		tr2.setQuantita(1.0);
		tr2.setTipoTransazione(TipoTransazione.vendo);

		tr3.setData("12 Ottobre 2016 17:45");
		tr3.setOggetto("Peperoni");
		tr3.setQuantita(1.0);
		tr3.setTipoTransazione(TipoTransazione.acquisto);

		tr4.setData("14 Ottobre 2016 10:25");
		tr4.setOggetto("Cipolle");
		tr4.setQuantita(2.0);
		tr4.setTipoTransazione(TipoTransazione.acquisto);

		tr5.setData("14 Ottobre 2016 13:25");
		tr1.setOggetto("Patate");
		tr1.setQuantita(24.0);
		tr1.setTipoTransazione(TipoTransazione.vendo);

		this.resultTrans = new ArrayList<Transazione>();

		this.resultTrans.add(tr1);
		this.resultTrans.add(tr2);		
		this.resultTrans.add(tr3);
		this.resultTrans.add(tr4);
		this.resultTrans.add(tr5);

		p = new Punti();
		p.setPunti(10000);

	}
	
	public List<ItemMag> getResultMag() {
		return resultMag;
	}



	public List<Transazione> getResultTrans() {
		return resultTrans;
	}



	public Punti getP() {
		return p;
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
		return this.resultMag;
	}

	@Override
	public List<Transazione> getStorico(long id) {
		return this.resultTrans;
	}

	@Override
	public Transazione addTransazione(long id, RichiestaTransazione rt)
	{
		Transazione resultNewTrans = new Transazione();
		resultNewTrans.setData("30 Febbraio 2030");
		resultNewTrans.setOggetto(rt.getOggetto());
		resultNewTrans.setQuantita(rt.getQuantita()+0.0);
		resultNewTrans.setTipoTransazione(rt.getTipoTransazione());

		return resultNewTrans;
	}

	@Override
	public Punti getPunti(long id)
	{
		return this.p;
	}
	
	//TODO fare la truffa
	@Override
	public List<Task> getTask() {
		return new ArrayList<Task>();
	}
	
	public Task completeTask(long id, RichiestaTask rt){
		return new Task();
	}

}
