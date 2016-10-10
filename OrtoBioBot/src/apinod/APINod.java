package apinod;

public class APINod {

	
	private String OK = "\"OK\"";
	
	private String ip = "http://192.168.15.69";
	private String porta = ":3000";
	private String sitoBase;
	private String apiBase = "/rest-api/utenteTelegram/";
	private String isNellOrto = "isNellOrto/";
	private String addIngresso = "addIngresso/";
	private String addUscita = "addUscita/";
	private String urlIsNellOrto;
	private String urlAddIngresso;
	private String urlAddUscita;
	private ChiamatoreAPI API;
	
	public APINod() {
		sitoBase = ip + porta + apiBase;
		urlIsNellOrto = sitoBase + isNellOrto;
		urlAddIngresso = sitoBase + addIngresso;
		urlAddUscita = sitoBase + addUscita;
		API = new ChiamatoreAPI();
	}
	
	
	public boolean isNellOrto(long id)
	{
		return API.getAlServer(urlIsNellOrto + String.valueOf(id)).equals("true");
	}

	public boolean addIngresso(long id)
	{
		return API.putAlServer(urlAddIngresso + String.valueOf(id)).equals(OK);
	}
	
	public boolean addUscita(long id)
	{
		return API.putAlServer(urlAddUscita + String.valueOf(id)).equals(OK);
	}
	
}
