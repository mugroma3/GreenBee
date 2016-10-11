package bot;

import java.util.ArrayList;
import java.util.List;

import com.botticelli.bot.request.methods.ChatActionToSend;
import com.botticelli.bot.request.methods.MessageToSend;
import com.botticelli.bot.request.methods.PhotoFileToSend;
import com.botticelli.bot.request.methods.PhotoReferenceToSend;
import com.botticelli.bot.request.methods.types.ActionToSend;
import com.botticelli.bot.request.methods.types.KeyboardButton;
import com.botticelli.bot.request.methods.types.Message;
import com.botticelli.bot.request.methods.types.ReplyKeyboardMarkupWithButtons;

import apinod.APINod;
import gestionelingue.English;
import gestionelingue.Italiano;
import gestionelingue.Lingue;
import oggettijson.ItemMag;
import oggettijson.Punti;

public class VoceMercato {

	private ItemMag oggetto;
	private OrtoBioBot bot;
	private Message m;
	private StatoUtente stato;
	private static ReplyKeyboardMarkupWithButtons buyMenu;
	private static ReplyKeyboardMarkupWithButtons compraMenu;
	
	public VoceMercato(ItemMag oggetto, Message m, OrtoBioBot bot, StatoUtente stato) {
		this.oggetto = oggetto;
		this.m = m;
		this.stato = stato;
		this.bot = bot;
		VoceMercato.buildMenu();
	}

	private static void buildMenu()
	{
		if(compraMenu == null)
		{
			compraMenu = new ReplyKeyboardMarkupWithButtons(new ArrayList<List<KeyboardButton>>());
			compraMenu.addLine(Italiano.COMPRA, Italiano.NOCOMPRA);
			compraMenu.setResizeKeyboard(true);
			
			buyMenu = new ReplyKeyboardMarkupWithButtons(new ArrayList<List<KeyboardButton>>());
			buyMenu.addLine(English.BUY, English.DONTBUY);
			buyMenu.setResizeKeyboard(true);
		}
	}

	/*
	 * torna false se l'utente non può comprare
	 */
	public boolean sendVoce() 
	{
		boolean ricco = true;
		MessageToSend mts;
		if(oggetto.getTelegramRefImg() == null)
		{
			bot.sendChatAction(new ChatActionToSend(m.getChat().getId(), ActionToSend.UPLOADPHOTO));
			bot.sendPhotoFile(new PhotoFileToSend(m.getChat().getId(), APINod.getIstance().saveImage(oggetto.getImmagine())));
		}
		else
			bot.sendPhotobyReference(new PhotoReferenceToSend(m.getChat().getId(), oggetto.getTelegramRefImg()));
		Punti p = APINod.getIstance().getPunti(m.getFrom().getId());
		p.setPunti(189); //TODO togliere appena porco dio
		if(p.getPunti() < oggetto.getCosto())
			ricco = false;
		//TODO fare punti
		
		if(stato.getLingua() == Lingue.INGLESE)
		{
			if(ricco)
			{
				mts = new MessageToSend(m.getChat().getId(),English.VUOICOMP + oggetto.getNome() + English.ALCOSTO +
					(oggetto.getCosto()) +English.ALKILO);
				mts.setReplyMarkup(VoceMercato.buyMenu);
			}
			else
				mts = new MessageToSend(m.getChat().getId(), Italiano.NONHAIPUNTI + oggetto.getNome());			
		}
		else
		{
			if(ricco)
			{
				mts = new MessageToSend(m.getChat().getId(),Italiano.VUOICOMP + oggetto.getNome() + Italiano.ALCOSTO +
					(oggetto.getCosto()) + Italiano.ALKILO);
				mts.setReplyMarkup(VoceMercato.compraMenu);
			}
			else
				mts = new MessageToSend(m.getChat().getId(), Italiano.NONHAIPUNTI + oggetto.getNome());
		}
		
		bot.sendMessage(mts);
	    
		return ricco;
	}

}
