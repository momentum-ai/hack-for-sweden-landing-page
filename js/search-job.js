/* eslint-env browser */
/* global $, _, getJson, postJson, Bloodhound */

async function getAFCategories () {
  const url = 'https://www.arbetsformedlingen.se/rest/matchning/rest/af/v1/matchning/matchningskriterier?typer=yrken&typer=yrkesgrupper&typer=yrkesomraden'
  return getJson(url)
}

async function getAFRegions () {
  const url = 'https://www.arbetsformedlingen.se/rest/matchning/rest/af/v1/matchning/matchningskriterier?typer=kommuner&typer=lan&typer=land'
  return getJson(url)
}

async function getAFJobs (searchCriteria) {
  const url = 'https://www.arbetsformedlingen.se/rest/pbapi/af/v1/matchning/matchandeRekryteringsbehov'
  const payload = {
    'startrad': 0,
    'maxAntal': 100,
    'sorteringsordning': 'RELEVANS',
    'franPubliceringsdatum': '',
    'matchningsprofil': {
      'profilkriterier': searchCriteria
      // [
      //   {
      //     "typ": "YRKESROLL",
      //     "varde": "6509",
      //     "namn": "Civilingenjör, systemutveckling"
      //   },
      //   {
      //     "typ": "YRKESROLL",
      //     "varde": "2419",
      //     "namn": "Systemutvecklare / Programmerare"
      //   },
      //   {
      //     "typ": "KOMMUN",
      //     "varde": "0180",
      //     "namn": "Stockholm"
      //   }
      // ]
    }
  }
  return postJson(url, payload)
}

async function main () {
  let afCategories = await getAFCategories()
  afCategories = _.filter(afCategories, { typ: 'YRKE' })
  const afRegions = await getAFRegions()

  $('#jobCategory').tagsinput({
    itemValue: 'id',
    itemText: 'namn',
    typeaheadjs: {
      displayKey: 'namn',
      source: new Bloodhound({
        local: afCategories,
        limit: 10,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('namn')
      }).ttAdapter()
    }
  })

  $('#jobRegion').tagsinput({
    itemValue: 'id',
    itemText: 'namn',
    typeaheadjs: {
      displayKey: 'namn',
      source: new Bloodhound({
        local: afRegions,
        limit: 10,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('namn')
      }).ttAdapter()
    }
  })

  $('#search').click(async ev => {
    const selectedCategoryIds = $('#jobCategory').val().split(',')
    const selectedRegionIds = $('#jobRegion').val().split(',')

    const selectedCategories = _.filter(afCategories, x => selectedCategoryIds.includes(x.id))
    const selectedRegions = _.filter(afRegions, x => selectedRegionIds.includes(x.id))

    const searchCriteria = _.concat(selectedCategories, selectedRegions)
      .map(x => _.clone(x)) // Clone the objects so that the below alterations are not persisted.

    for (const searchCriterion of searchCriteria) {
      searchCriterion.varde = searchCriterion.id
      delete searchCriterion.id
      if (searchCriterion.typ === 'YRKE') {
        searchCriterion.typ = 'YRKESROLL'
      }
    }

    let jobs
    try {
      const afJobData = await getAFJobs(searchCriteria)
      jobs = afJobData.rekryteringsbehov
    } catch {
      alert('Failed to request AF API')
    }

    let jobsSortedByPersonality
    try {
      jobsSortedByPersonality = window.personality ?
        await postJson('/api/jobs', { jobIds: _.map(jobs, 'id') }) : jobs
    } catch (err) {
      alert('Failed to get personalized jobs. ' + JSON.stringify(err, null, 2))
    }

    showMapWithJobs(jobs) 

    $('#jobs').html(_.template(`
      <% _.forEach(jobsSortedByPersonality, job => { %>
        <p>
          <pre><%- JSON.stringify(job, null, 2) %>
        </p>
      <% }) %>
    `)({jobsSortedByPersonality}))
  })
}

main()
