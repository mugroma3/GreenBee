package apinod;


import java.util.List;

import oggettijson.ItemMag;
import oggettijson.Punti;
import oggettijson.RichiestaTransazione;
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
		return null;
	}

	@Override
	public List<Transazione> getStorico(long id) {
		return null;
	}
	
	@Override
	public Transazione addTransazione(long id, RichiestaTransazione rt)
	{
		return null;
	}
	
	@Override
	public Punti getPunti(long id)
	{
		return null;
	}

}
