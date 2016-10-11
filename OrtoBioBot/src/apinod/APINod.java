package apinod;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import com.botticelli.bot.request.methods.types.GsonOwner;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import oggettijson.ItemMag;

public class APINod {

	//Type founderListType = new TypeToken<ArrayList<Founder>>(){}.getType();  
	
	private String OK = "\"OK\"";
	private Gson gson;
	//private String ip = "http://192.168.15.69";
	private String ip = "http://greenbeemfr.herokuapp.com";
	//private String porta = ":3000";
	private String porta = ":80";
	private String sitoBase;
	private String apiBase = "/rest-api/utenteTelegram/";
	private String apiMagazzino = "/rest-api/Magazzino/";
	
	private String isNellOrto = "isNellOrto/";
	private String addIngresso = "addIngresso/";
	private String addUscita = "addUscita/";
	private String urlIsNellOrto;
	private String urlAddIngresso;
	private String urlAddUscita;
	private String urlMagazzino;
	private ChiamatoreAPI API;
	
	public APINod() {
		gson = GsonOwner.getInstance().getGson();
		sitoBase = ip + porta + apiBase;
		urlIsNellOrto = sitoBase + isNellOrto;
		urlAddIngresso = sitoBase + addIngresso;
		urlAddUscita = sitoBase + addUscita;
		urlMagazzino = ip + porta + apiMagazzino;
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
	
	public List<ItemMag> getMagazzino()
	{
		String json = API.getAlServer(urlMagazzino);
		System.out.println(json);
		return gson.fromJson(json,  new TypeToken<ArrayList<ItemMag>>(){}.getType());
	}
	
}
