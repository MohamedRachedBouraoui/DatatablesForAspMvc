/* Singleton */

var DtApi = (function () {

    // Instance stores a reference to the Singleton
    var instances = {};

    function dtApiInit(jqueryTable) {
        
        // Private variables
       
        var jQTableElement = jqueryTable;
        var dtApi = jQTableElement.DataTable();

        var dtColumns = dtApi.settings().init().columns;

        // Private methods
        function dispatchRowAddingEvent(row) {

            var event = jQuery.Event("new_row_adding.dt");
            event.dt_newRow = row;
            event.dt_context = dtApi;

            jQTableElement.trigger(event);

            return !event.isDefaultPrevented();
        }
        function dispatchRowAddedEvent(row) {

            var event = jQuery.Event("new_row_added.dt");
            event.dt_newRow = row;
            event.dt_newRowIndex = dtApi.rows[0];
            event.dt_context = dtApi;

            jQTableElement.trigger(event);
        }
        function dispatchRowRemovedEvent() {

            var event = jQuery.Event("row_removed.dt");
            event.dt_rowIndex = ligneSelectionneeIndex;
            event.dt_rowData = donneesLigneSelectionnee;
            event.dt_context = dtApi;

            jQTableElement.trigger(event);
        }
        function dispatchRowRemovingEvent() {

            var event = jQuery.Event("row_removing.dt");
            event.dt_rowIndex = ligneSelectionneeIndex;
            event.dt_rowData = ligneSelectionnee.data();
            event.dt_context = dtApi;

            jQTableElement.trigger(event);

            return !event.isDefaultPrevented();
        }
        function dispatchRowUpdatingEvent(rowNewdata) {

            var event = jQuery.Event("row_updating.dt");
            event.dt_rowIndex = ligneSelectionneeIndex;
            event.dt_rowOldData = ligneSelectionnee.data();
            event.dt_rowNewdata = rowNewdata;
            event.dt_context = dtApi;

            jQTableElement.trigger(event);

            return !event.isDefaultPrevented();
        }
        function dispatchRowUpdatedEvent(rowNewdata) {

            var event = jQuery.Event("row_updated.dt");
            event.dt_rowIndex = ligneSelectionneeIndex;
            event.dt_rowOldData = ligneSelectionnee.data();
            event.dt_rowNewdata = rowNewdata;
            event.dt_context = dtApi;

            jQTableElement.trigger(event);
        }

        function verifierSiDataTableInitialisee() {
            return $.fn.DataTable.isDataTable("#" + tableId);
        }

        function viderTable() {
            dtApi.clear().draw();
            resetLigne();
        }

        function recupererNouvellesDonneesParAjax() {
            dtApi.ajax.reload();
            resetLigne();
        }

        function resetLigne() {
            ligneSelectionneeIndex = null;
            ligneSelectionnee = null;
            lignesSelectionnees = null;
            donneesLigneSelectionnee = null;
        }

        function ajouterLigne(ligne) {
            if (ligne === undefined || ligne === null) {
                throw 'Il faut fournir les données pour la nouvelle ligne.';
            }

            let dateFormat = jQTableElement.attr('default_date_time_format');
            DtDatesHelper.dtConvertDates(ligne, dateFormat);

            if (dispatchRowAddingEvent(ligne) === false) {
                return this;
            }

            ligne.isDirty = true;

            dtApi.row.add(ligne).draw(true);

            dispatchRowAddedEvent(ligne);
            return this;
        }

        function recupereLigneParIndex(index) {
            if (index === undefined || index === null || index === NaN) {
                throw 'Il faut fournir un index valide.';
            }

            ligneSelectionnee = dtApi.row(index);
            donneesLigneSelectionnee = ligneSelectionnee.data();
            ligneSelectionneeIndex = index;
            return this;
        }

        function recupereDonneesLigne() {
            if (ligneSelectionnee === undefined || ligneSelectionnee === null) {
                throw 'Il faut sélectionner une ligne d\'abord.';
            }

            return ligneSelectionnee.data();
        }

        function recupereIndexLigne() {
            if (ligneSelectionnee === undefined || ligneSelectionnee === null) {
                throw 'Il faut sélectionner une ligne d\'abord.';
            }
            return ligneSelectionneeIndex;
        }

        function supprimerLigne() {
            if (ligneSelectionnee === undefined || ligneSelectionnee === null) {
                throw 'Il faut sélectionner une ligne d\'abord.';
            }
            if (dispatchRowRemovingEvent() === false) {
                return this;
            }

            ligneSelectionnee.remove().draw(false).rows().invalidate().rows().deselect();

            dispatchRowRemovedEvent();
            resetLigne();

            return this;
        }


        function modifierLigne(nouvellesDonnees) {

            if (ligneSelectionnee === undefined || ligneSelectionnee === null) {
                throw 'Il faut sélectionner une ligne d\'abord.';
            }
            if (nouvellesDonnees === undefined || nouvellesDonnees === null) {
                throw 'Il faut fournir des données valides pour modifier la ligne.';
            }

            let dateFormat = jQTableElement.attr('default_date_time_format');
            DtDatesHelper.dtConvertDates(nouvellesDonnees, dateFormat);

            mettreAAjourCellulesModifiees(nouvellesDonnees);

            if (dispatchRowUpdatingEvent(nouvellesDonnees) === false) {
                return this;
            }
            ligneSelectionnee.data(nouvellesDonnees);

            dispatchRowUpdatedEvent(nouvellesDonnees)

            resetLigne();

            // dtApi.draw(false).rows().invalidate();
            return this;
        }

        function reinitLigne(anciennesDonnees) {

            if (ligneSelectionnee === undefined || ligneSelectionnee === null) {
                throw 'Il faut sélectionner une ligne d\'abord.';
            }
            if (anciennesDonnees === undefined || anciennesDonnees === null) {
                throw 'Il faut fournir des données valides pour reinitialiser la ligne.';
            }

            let dateFormat = jQTableElement.attr('default_date_time_format');
            DtDatesHelper.dtConvertDates(anciennesDonnees, dateFormat);

            reinitCellulesModifiees(anciennesDonnees);

            if (dispatchRowUpdatingEvent(anciennesDonnees) === false) {
                return this;
            }
            ligneSelectionnee.data(anciennesDonnees);

            dispatchRowUpdatedEvent(anciennesDonnees)

            resetLigne();

            // dtApi.draw(false).rows().invalidate();
            return this;
        }

        function mettreAAjourCellulesModifiees(nouvellesDonnees) {


            for (var i = 0; i < dtColumns.length; i++) {
                let cName = dtColumns[i].name;
                let cIndex = dtApi.column(cName + ':name').index();

                if (nouvellesDonnees[cName] !== undefined
                    && donneesLigneSelectionnee[cName] !== undefined
                    && (nouvellesDonnees[cName]).toString() != (donneesLigneSelectionnee[cName]).toString()) {//la valeurà changé

                    var cell = dtApi.cells(ligneSelectionneeIndex, cIndex); // cell ayant une nouvelle valeur
                    $(cell.nodes()).addClass('dt-dirty');

                    nouvellesDonnees.isDirty = true;
                }
            }
        }

        function reinitCellulesModifiees(anciennesDonnees) {


            for (var i = 0; i < dtColumns.length; i++) {
                let cName = dtColumns[i].name;
                let cIndex = dtApi.column(cName + ':name').index();

                if (anciennesDonnees[cName] !== undefined
                    && donneesLigneSelectionnee[cName] !== undefined) {

                    var cell = dtApi.cells(ligneSelectionneeIndex, cIndex);
                    $(cell.nodes()).removeClass('dt-dirty');

                    anciennesDonnees.isDirty = undefined;
                }
            }
        }

        function recupereLignesSelectionnees() {

            lignesSelectionnees = dtApi.rows({ selected: true });
            return this;
        }

        function supprimerLignes() {
            if (lignesSelectionnees === undefined || lignesSelectionnees === null) {
                throw 'Il faut sélectionner une ou plusieurs lignes d\'abord.';
            }
            //if (dispatchRowRemovingEvent() === false) {
            //    return this;
            //}

            lignesSelectionnees.remove().draw(false).rows().invalidate().rows().deselect();

            dispatchRowRemovedEvent();
            resetLigne();

            return this;
        }

        function recupererToutesDonnees() {

            return dtApi.rows().data().toArray();
        }

        function recupererValeursSelonNomColonne(nomColonne) {
            if (nomColonne === undefined || nomColonne === null) {
                throw 'Il faut préciser le nom de la colonne.'
            }
            return dtApi.column(nomColonne + ':name').data().toArray();
        }

        function recupererValeursDeColonneSelonCritere(nomColonne, critere) {
            if (nomColonne === undefined || nomColonne === null) {
                throw 'Il faut préciser le nom de la colonne.'
            }

            if (critere === undefined || critere === null) {
                throw 'Il faut préciser le critère de recherche.'
            }

            let resultat = [];

            dtApi.rows(function (idx, data, node) {
                if (data[critere.critere] === critere.valeur) {
                    resultat.push(data[nomColonne]);
                }
                return false;
            });


            //let donneesLignes = dtApi.rows().data().toArray();
            //for (var i = 0; i < donneesLignes.length; i++) {
            //    if (donneesLignes[i][critere.critere] === critere.valeur) {
            //        resultat.push(donneesLignes[i][nomColonne]);
            //    }
            //}
            return resultat;
        }

        function ajouterClassAuCellule(_class, nomColonne, indexLigne) {
            if (_class === undefined || _class === null) {
                throw 'Il faut préciser le nom de la classe CSS.'
            }

            if (nomColonne === undefined || nomColonne === null) {
                throw 'Il faut préciser le nom de la colonne.'
            }

            if (indexLigne === undefined || indexLigne === null) {
                throw 'Il faut préciser l\'indexe de ligne.'
            }

            let cIndex = dtApi.column(nomColonne + ':name').index();
            var cell = dtApi.cells(indexLigne, cIndex);
            $(cell.nodes()).addClass(_class);
        }

        function enleverClassDuCellule(_class, nomColonne, indexLigne) {
            if (_class === undefined || _class === null) {
                throw 'Il faut préciser le nom de la classe CSS.'
            }

            if (nomColonne === undefined || nomColonne === null) {
                throw 'Il faut préciser le nom de la colonne.'
            }

            if (indexLigne === undefined || indexLigne === null) {
                throw 'Il faut préciser l\'indexe de ligne.'
            }

            let cIndex = dtApi.column(nomColonne + ':name').index();
            var cell = dtApi.cells(indexLigne, cIndex);
            $(cell.nodes()).removeClass(_class);
        }

        function recupererIndexesLignesSelonCritere(critere) {
            if (critere === undefined || critere === null) {
                throw 'Il faut préciser le critère de recherche.'
            }

            var rowIndexes = [];
            dtApi.rows(function (idx, data, node) {
                if (data[critere.critere] === critere.valeur) {
                    rowIndexes.push(idx);
                }
                return false;
            });
            return rowIndexes;
        }

        function SupprimerLignesSelonCritere(critere) {
            if (critere === undefined || critere === null) {
                throw 'Il faut préciser le critère de recherche.'
            }

            var rowIndexes = recupererIndexesLignesSelonCritere(critere);
            if (rowIndexes.length === 0) {
                return false;
            }

            for (var i = rowIndexes.length - 1; i >= 0; i--) {
                ligneSelectionnee = dtApi.row(rowIndexes[i]);
                ligneSelectionneeIndex = rowIndexes[i];
                supprimerLigne();
            }
            return true;
        }

        function modifierLignesSelonCritere(critereDeRecherche, nouvelleValeurAPrendre) {
            //{ critere: 'IdPoste', valeur: arg.idPosteInactive }, { critere: 'DateFin', nouvelleValeur: arg.dateFin }
            if (critereDeRecherche === undefined || critereDeRecherche === null) {
                throw 'Il faut préciser le critère de recherche.'
            }
            if (nouvelleValeurAPrendre === undefined || nouvelleValeurAPrendre === null) {
                throw 'Il faut préciser la nouvelle valeur.'
            }
            var rowIndexes = recupererIndexesLignesSelonCritere(critereDeRecherche);
            if (rowIndexes.length === 0) {
                return false;
            }

            for (var i = 0; i < rowIndexes.length; i++) {
                ligneSelectionnee = dtApi.row(rowIndexes[i]);
                ligneSelectionneeIndex = rowIndexes[i];
                donneesLigneSelectionnee = dtApi.row(rowIndexes[i]).data();// afin de détecter les colonnes ayant reçus les changements

                let nouvelleDonneeLigne = {};
                jQuery.extend(true, nouvelleDonneeLigne, donneesLigneSelectionnee);//Cloner la ligne avant de la maj avec la "nouvelleValeur"

                nouvelleDonneeLigne[nouvelleValeurAPrendre.critere] = nouvelleValeurAPrendre.nouvelleValeur; // inserer la nouvelle valeur dans la clone afin d'utiliser la méthode "mettreAAjourCellulesModifiees"

                modifierLigne(nouvelleDonneeLigne);
            }

            return true;
        }

        return {
            // Public methods and variables
            verifierSiDataTableInitialisee,
            viderTable,
            recupererNouvellesDonneesParAjax,
            resetLigne,
            ajouterLigne,
            recupereLigneParIndex,
            recupereDonneesLigne,
            recupereIndexLigne,
            supprimerLigne,
            modifierLigne,
            reinitLigne,
           // mettreAAjourCellulesModifiees,
            //reinitCellulesModifiees,
            recupereLignesSelectionnees,
            supprimerLignes,
            recupererToutesDonnees,
            recupererValeursSelonNomColonne,
            recupererValeursDeColonneSelonCritere,
            ajouterClassAuCellule,
            enleverClassDuCellule,
            recupererIndexesLignesSelonCritere,
            SupprimerLignesSelonCritere,
            modifierLignesSelonCritere
        };
    };
    return {
        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance: function (jqueryTable) {
            if (jqueryTable == undefined || jqueryTable == null) {
                throw 'A Jquery reference to the table is needed.';                
            }
            if (!instances[jqueryTable]) {
                instances[jqueryTable] = dtApiInit(jqueryTable);
            }
            return instances[jqueryTable];
        }
    };
})();