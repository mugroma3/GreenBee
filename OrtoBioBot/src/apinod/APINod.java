package apinod;

public class APINod {

	
	private String ip = "192.168.15.68";
	private String porta = ":3000";
	private String sitoBase;
	private String apiBase = "/rest-api/utenteTelegram/";
	private String isNellOrto = "isNellOrto/";
	private String urlIsNellOrto;
	
	public APINod() {
		sitoBase = ip + porta + apiBase;
		urlIsNellOrto = sitoBase + isNellOrto;
	}

	public String getIsNellOrto() {
		return isNellOrto;
	}

	public void setIsNellOrto(String isNellOrto) {
		this.isNellOrto = isNellOrto;
	}

	
	
	
	
}
