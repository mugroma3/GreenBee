package oggettijson;

public class Task {
	
	private String _id;
	private String nome;
	private int ricompensa;
	private String data;
	private int scadenza;
	
	
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public int getRicompensa() {
		return ricompensa;
	}
	public void setRicompensa(int ricompensa) {
		this.ricompensa = ricompensa;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public int getScadenza() {
		return scadenza;
	}
	public void setScadenza(int scadenza) {
		this.scadenza = scadenza;
	}
	

}
