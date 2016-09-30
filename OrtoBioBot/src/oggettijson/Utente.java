package oggettijson;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;

@Generated("org.jsonschema2pojo")
public class Utente {

	private String id;
	private String nome;
	private String username;
	private String password;
	private Integer v;
	private Accesso ultimoAccesso;
	private List<Transazione> transazioni = new ArrayList<>();
	private List<Accesso> accessi = new ArrayList<Accesso>();
	private Integer punti;
	private Boolean admin;

	/**
	 *
	 * @return The id
	 */
	public String getId() {
		return id;
	}

	/**
	 *
	 * @param id
	 *            The _id
	 */
	public void setId(String id) {
		this.id = id;
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
	 * @return The username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 *
	 * @param username
	 *            The username
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 *
	 * @return The password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 *
	 * @param password
	 *            The password
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 *
	 * @return The v
	 */
	public Integer getV() {
		return v;
	}

	/**
	 *
	 * @param v
	 *            The __v
	 */
	public void setV(Integer v) {
		this.v = v;
	}

	/**
	 *
	 * @return The ultimoAccesso
	 */
	public Accesso getUltimoAccesso() {
		return ultimoAccesso;
	}

	/**
	 *
	 * @param ultimoAccesso
	 *            The ultimoAccesso
	 */
	public void setUltimoAccesso(Accesso ultimoAccesso) {
		this.ultimoAccesso = ultimoAccesso;
	}

	/**
	 *
	 * @return The transazioni
	 */
	public List<Transazione> getTransazioni() {
		return transazioni;
	}

	/**
	 *
	 * @param transazioni
	 *            The transazioni
	 */
	public void setTransazioni(List<Transazione> transazioni) {
		this.transazioni = transazioni;
	}

	/**
	 *
	 * @return The accessi
	 */
	public List<Accesso> getAccessi() {
		return accessi;
	}

	/**
	 *
	 * @param accessi
	 *            The accessi
	 */
	public void setAccessi(List<Accesso> accessi) {
		this.accessi = accessi;
	}

	/**
	 *
	 * @return The punti
	 */
	public Integer getPunti() {
		return punti;
	}

	/**
	 *
	 * @param punti
	 *            The punti
	 */
	public void setPunti(Integer punti) {
		this.punti = punti;
	}

	/**
	 *
	 * @return The admin
	 */
	public Boolean getAdmin() {
		return admin;
	}

	/**
	 *
	 * @param admin
	 *            The admin
	 */
	public void setAdmin(Boolean admin) {
		this.admin = admin;
	}

}