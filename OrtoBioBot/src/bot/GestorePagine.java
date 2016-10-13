package bot;

import java.util.List;

public class GestorePagine <T>{

	private List<T> raccoglitore;
	private int maxPages = 0;
	private int pagina = 0;

	public int getPagina() 
	{
		return pagina;
	}

	public int paginaAvanti()
	{
		pagina++;
		pagina = Math.min(maxPages - 1, pagina);
		return pagina;
	}
	
	public int paginaIndietro()
	{
		pagina--;
		pagina = Math.max(0, pagina);
		return pagina;
	}
	
	public List<T> getRaccoglitore() {
		return raccoglitore;
	}
	
	
	public void setRaccoglitore(List<T> raccoglitore) {
		pagina = 0;
		maxPages = raccoglitore.size() / NumericKeyboardFactory.PAGESIZE;
		if(raccoglitore.size() % NumericKeyboardFactory.PAGESIZE > 0)
			maxPages++;
		
		this.raccoglitore = raccoglitore;
	}
	
	
	public T getItemMagFromInexPage(int index)
	{
		index = (index - 1) + pagina * NumericKeyboardFactory.PAGESIZE;
		index = Math.min(raccoglitore.size() - 1, index);
		if(index < 0)
		    return null;
		return raccoglitore.get(index);
	}
	
	public int size()
	{
		return raccoglitore.size();
	}
	
	public T get(int i)
	{
		return raccoglitore.get(i);
	}
}
