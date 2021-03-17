class DtApi {

    constructor(tableId) {
        this.tableId = tableId;
        this.jQTableElement = $("#" + tableId);
        this.dtApi = this.jQTableElement.DataTable();

        this.dtColumns = this.dtApi.settings().init().columns;
    }

    dispatchRowAddingEvent(row) {

        var event = jQuery.Event("new_row_adding.dt");
        event.dt_newRow = row;
        event.dt_context = this.dtApi;

        this.jQTableElement.trigger(event);

        return !event.isDefaultPrevented();
    }
    dispatchRowAddedEvent(row) {

        var event = jQuery.Event("new_row_added.dt");
        event.dt_newRow = row;
        event.dt_newRowIndex = this.dtApi.rows[0];
        event.dt_context = this.dtApi;

        this.jQTableElement.trigger(event);
    }
    dispatchRowRemovedEvent() {

        var event = jQuery.Event("row_removed.dt");
        event.dt_rowIndex = this.ligneSelectionneeIndex;
        event.dt_rowData = this.donneesLigneSelectionnee;
        event.dt_context = this.dtApi;

        this.jQTableElement.trigger(event);
    }
    dispatchRowRemovingEvent() {

        var event = jQuery.Event("row_removing.dt");
        event.dt_rowIndex = this.ligneSelectionneeIndex;
        event.dt_rowData = this.ligneSelectionnee.data();
        event.dt_context = this.dtApi;

        this.jQTableElement.trigger(event);

        return !event.isDefaultPrevented();
    }
    dispatchRowUpdatingEvent(rowNewdata) {

        var event = jQuery.Event("row_updating.dt");
        event.dt_rowIndex = this.ligneSelectionneeIndex;
        event.dt_rowOldData = this.ligneSelectionnee.data();
        event.dt_rowNewdata = rowNewdata;
        event.dt_context = this.dtApi;

        this.jQTableElement.trigger(event);

        return !event.isDefaultPrevented();
    }
    dispatchRowUpdatedEvent(rowNewdata) {

        var event = jQuery.Event("row_updated.dt");
        event.dt_rowIndex = this.ligneSelectionneeIndex;
        event.dt_rowOldData = this.ligneSelectionnee.data();
        event.dt_rowNewdata = rowNewdata;
        event.dt_context = this.dtApi;

        this.jQTableElement.trigger(event);
    }

    verifierSiDataTableInitialisee() {
        return $.fn.DataTable.isDataTable("#" + this.tableId);
    }

    viderTable() {
        this.dtApi.clear().draw();
        this.resetLigne();
    }

    recupererNouvellesDonneesParAjax() {
        this.dtApi.ajax.reload();
        this.resetLigne();
    }

    resetLigne() {
        this.ligneSelectionneeIndex = null;
        this.ligneSelectionnee = null;
        this.lignesSelectionnees = null;
        this.donneesLigneSelectionnee = null;
    }

    ajouterLigne(ligne) {
        if (ligne === undefined || ligne === null) {
            throw 'Il faut fournir les données pour la nouvelle ligne.';
        }

        let dateFormat = this.jQTableElement.attr('default_date_time_format');
        DtDatesHelper.dtConvertDates(ligne, dateFormat );

        if (this.dispatchRowAddingEvent(ligne) === false) {
            return this;
        }

        ligne.isDirty = true;

        this.dtApi.row.add(ligne).draw(true);

        this.dispatchRowAddedEvent(ligne);
        return this;
    }

    recupereLigneParIndex(index) {
        if (index === undefined || index === null || index === NaN) {
            throw 'Il faut fournir un index valide.';
        }

        this.ligneSelectionnee = this.dtApi.row(index);
        this.donneesLigneSelectionnee = this.ligneSelectionnee.data();
        this.ligneSelectionneeIndex = index;
        return this;
    }

    recupereDonneesLigne() {
        if (this.ligneSelectionnee === undefined || this.ligneSelectionnee === null) {
            throw 'Il faut sélectionner une ligne d\'abord.';
        }

        return this.ligneSelectionnee.data();
    }

    recupereIndexLigne() {
        if (this.ligneSelectionnee === undefined || this.ligneSelectionnee === null) {
            throw 'Il faut sélectionner une ligne d\'abord.';
        }
        return this.ligneSelectionneeIndex;
    }

    supprimerLigne() {
        if (this.ligneSelectionnee === undefined || this.ligneSelectionnee === null) {
            throw 'Il faut sélectionner une ligne d\'abord.';
        }
        if (this.dispatchRowRemovingEvent() === false) {
            return this;
        }

        this.ligneSelectionnee.remove().draw(false).rows().invalidate().rows().deselect();

        this.dispatchRowRemovedEvent();
        this.resetLigne();

        return this;
    }


    modifierLigne(nouvellesDonnees) {

        if (this.ligneSelectionnee === undefined || this.ligneSelectionnee === null) {
            throw 'Il faut sélectionner une ligne d\'abord.';
        }
        if (nouvellesDonnees === undefined || nouvellesDonnees === null) {
            throw 'Il faut fournir des données valides pour modifier la ligne.';
        }

        let dateFormat = this.jQTableElement.attr('default_date_time_format');        
        DtDatesHelper.dtConvertDates(nouvellesDonnees, dateFormat);

        this.mettreAAjourCellulesModifiees(nouvellesDonnees);

        if (this.dispatchRowUpdatingEvent(nouvellesDonnees) === false) {
            return this;
        }
        this.ligneSelectionnee.data(nouvellesDonnees);

        this.dispatchRowUpdatedEvent(nouvellesDonnees)

        this.resetLigne();

        //this.dtApi.draw(false).rows().invalidate();
        return this;
    }

    mettreAAjourCellulesModifiees(nouvellesDonnees) {


        for (var i = 0; i < this.dtColumns.length; i++) {
            let cName = this.dtColumns[i].name;
            let cIndex = this.dtApi.column(cName + ':name').index();

            if (nouvellesDonnees[cName] !== undefined
                && this.donneesLigneSelectionnee[cName] !== undefined
                && nouvellesDonnees[cName] !== this.donneesLigneSelectionnee[cName]) {//la valeurà changé

                var cell = this.dtApi.cells(this.ligneSelectionneeIndex, cIndex); // cell ayant une nouvelle valeur
                $(cell.nodes()).addClass('dt-dirty');

                nouvellesDonnees.isDirty = true;
            }
        }
    }

    recupereLignesSelectionnees() {

        this.lignesSelectionnees = this.dtApi.rows({ selected: true });
        return this;
    }

    supprimerLignes() {
        if (this.lignesSelectionnees === undefined || this.lignesSelectionnees === null) {
            throw 'Il faut sélectionner une ou plusieurs lignes d\'abord.';
        }
        //if (this.dispatchRowRemovingEvent() === false) {
        //    return this;
        //}

        this.lignesSelectionnees.remove().draw(false).rows().invalidate().rows().deselect();

        this.dispatchRowRemovedEvent();
        this.resetLigne();

        return this;
    }

    recupererToutesDonnees() {

        return this.dtApi.rows().data().toArray();
    }

    recupererValeursSelonNomColonne(nomColonne) {
        if (nomColonne === undefined || nomColonne === null) {
            throw 'Il faut préciser le nom de la colonne.'
        }
        return this.dtApi.column(nomColonne + ':name').data().toArray();
    }

    recupererValeursDeColonneSelonCritere(nomColonne, critere) {
        if (nomColonne === undefined || nomColonne === null) {
            throw 'Il faut préciser le nom de la colonne.'
        }

        if (critere === undefined || critere === null) {
            throw 'Il faut préciser le critère de recherche.'
        }

        let resultat = [];

        this.dtApi.rows(function (idx, data, node) {
            if (data[critere.critere] === critere.valeur) {
                resultat.push(data[nomColonne]);
            }
            return false;
        });


        //let donneesLignes = this.dtApi.rows().data().toArray();
        //for (var i = 0; i < donneesLignes.length; i++) {
        //    if (donneesLignes[i][critere.critere] === critere.valeur) {
        //        resultat.push(donneesLignes[i][nomColonne]);
        //    }
        //}
        return resultat;
    }

    ajouterClassAuCellule(_class, nomColonne, indexLigne) {
        if (_class === undefined || _class === null) {
            throw 'Il faut préciser le nom de la classe CSS.'
        }

        if (nomColonne === undefined || nomColonne === null) {
            throw 'Il faut préciser le nom de la colonne.'
        }

        if (indexLigne === undefined || indexLigne === null) {
            throw 'Il faut préciser l\'indexe de ligne.'
        }

        let cIndex = this.dtApi.column(nomColonne + ':name').index();
        var cell = this.dtApi.cells(indexLigne, cIndex);
        $(cell.nodes()).addClass(_class);
    }

    enleverClassDuCellule(_class, nomColonne, indexLigne) {
        if (_class === undefined || _class === null) {
            throw 'Il faut préciser le nom de la classe CSS.'
        }

        if (nomColonne === undefined || nomColonne === null) {
            throw 'Il faut préciser le nom de la colonne.'
        }

        if (indexLigne === undefined || indexLigne === null) {
            throw 'Il faut préciser l\'indexe de ligne.'
        }

        let cIndex = this.dtApi.column(nomColonne + ':name').index();
        var cell = this.dtApi.cells(indexLigne, cIndex);
        $(cell.nodes()).removeClass(_class);
    }

    recupererIndexesLignesSelonCritere(critere) {
        if (critere === undefined || critere === null) {
            throw 'Il faut préciser le critère de recherche.'
        }

        var rowIndexes = [];
        this.dtApi.rows(function (idx, data, node) {
            if (data[critere.critere] === critere.valeur) {
                rowIndexes.push(idx);
            }
            return false;
        });
        return rowIndexes;
    }

    SupprimerLignesSelonCritere(critere) {
        if (critere === undefined || critere === null) {
            throw 'Il faut préciser le critère de recherche.'
        }

        var rowIndexes = this.recupererIndexesLignesSelonCritere(critere);
        if (rowIndexes.length === 0) {
            return false;
        }

        for (var i = rowIndexes.length - 1; i >= 0; i--) {
            this.ligneSelectionnee = this.dtApi.row(rowIndexes[i]);
            this.ligneSelectionneeIndex = rowIndexes[i];
            this.supprimerLigne();
        }
        return true;
    }

    modifierLignesSelonCritere(critereDeRecherche, nouvelleValeurAPrendre) {
        //{ critere: 'IdPoste', valeur: arg.idPosteInactive }, { critere: 'DateFin', nouvelleValeur: arg.dateFin }
        if (critereDeRecherche === undefined || critereDeRecherche === null) {
            throw 'Il faut préciser le critère de recherche.'
        }
        if (nouvelleValeurAPrendre === undefined || nouvelleValeurAPrendre === null) {
            throw 'Il faut préciser la nouvelle valeur.'
        }
        var rowIndexes = this.recupererIndexesLignesSelonCritere(critereDeRecherche);
        if (rowIndexes.length === 0) {
            return false;
        }

        for (var i = 0; i < rowIndexes.length; i++) {
            this.ligneSelectionnee = this.dtApi.row(rowIndexes[i]);
            this.ligneSelectionneeIndex = rowIndexes[i];
            this.donneesLigneSelectionnee = this.dtApi.row(rowIndexes[i]).data();// afin de détecter les colonnes ayant reçus les changements

            let nouvelleDonneeLigne = {};
            jQuery.extend(true, nouvelleDonneeLigne, this.donneesLigneSelectionnee);//Cloner la ligne avant de la maj avec la "nouvelleValeur"

            nouvelleDonneeLigne[nouvelleValeurAPrendre.critere] = nouvelleValeurAPrendre.nouvelleValeur; // inserer la nouvelle valeur dans la clone afin d'utiliser la méthode "this.mettreAAjourCellulesModifiees"

            this.modifierLigne(nouvelleDonneeLigne);
        }

        return true;
    }
}