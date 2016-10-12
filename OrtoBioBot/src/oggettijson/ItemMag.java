package oggettijson;

public class ItemMag {

	private String _id;

	private String nome;

	private double costo;

	private String immagine;

	private int quantita;
	
	private String telegramRefImg = "AgADBAADA7ExG8rHcQQn7VqnXoZZeAx3ZxkABC_oZzGUcVlRX9UBAAEC"; //TODO togliere quando sarà

	
	/**
	 *
	 * @return The id
	 */
	public String getId() {
		return _id;
	}

	/**
	 *
	 * @param id
	 *            The _id
	 */
	public void setId(String id) {
		this._id = id;
	}

	/**
	 *
	 * @return The nome
	 */
	public String getNome() {
		return nome;
	}

	/**
	 *
	 * @param nome
	 *            The nome
	 */
	public void setNome(String nome) {
		this.nome = nome;
	}

	/**
	 *
	 * @return The costo
	 */
	public double getCosto() {
		return costo;
	}

	/**
	 *
	 * @param costo
	 *            The costo
	 */
	public void setCosto(double costo) {
		this.costo = costo;
	}

	/**
	 *
	 * @return The immagine
	 */
	public String getImmagine() {
		return immagine;
	}

	/**
	 *
	 * @param immagine
	 *            The immagine
	 */
	public void setImmagine(String immagine) {
		this.immagine = immagine;
	}



	/**
	 *
	 * @return The quantita
	 */
	public int getQuantita() {
		return quantita;
	}

	/**
	 *
	 * @param quantita
	 *            The quantita
	 */
	public void setQuantita(int quantita) 
	{
		this.quantita = quantita;
	}

	public String getTelegramRefImg() 
	{
		return telegramRefImg;
	}

	public void setTelegramRefImg(String telegramRefImg) 
	{
		this.telegramRefImg = telegramRefImg;
	}

	
}
