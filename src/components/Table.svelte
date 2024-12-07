<script>
	import {
		Button,
		Card,
		Dropdown,
		Modal,
		Progressbar,
		Radio,
		TabItem,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Tabs
	} from 'flowbite-svelte';
	import {
		AdjustmentsVerticalSolid,
		ArrowUpRightFromSquareOutline,
		ChevronDownOutline,
		GridSolid,
		LinkOutline,
		ListOutline
	} from 'flowbite-svelte-icons';
	import Loader from './Loader.svelte';

	let { data, selectedStatus } = $props();
	let { data: allData, error, loading } = data;

	let group3 = $state(1);
	let defaultModal = $state(false);
	let selectedData = $state({});
	let selectedView = $state('list');

	let filtered = $state(allData);

	const calculateProgress = (success, attempt) => {
		return Math.round((success / attempt) * 100);
	};

	const setView = (e) => {
		selectedView = e.currentTarget.getAttribute('value');
	};
</script>

{#if loading}
	<Loader />
{:else if error}
	<p class="text-red-700">Error: {error}</p>
{:else if data.length === 0}
	<p class="text-red-700">No landing pad data available.</p>
{:else}
	<div class="col-span-3 w-full">
		<div class="mb-3 flex justify-between">
			<!--  list/grid view -->
			<Tabs
				tabStyle="full"
				defaultClass="flex rounded-lg divide-x rtl:divide-x-reverse divide-gray-200 shadow"
			>
				<TabItem class="w-full" onclick={setView} value="list" open>
					<span slot="title">
						<ListOutline />
					</span>
				</TabItem>
				<TabItem class="w-full" onclick={setView} value="grid">
					<span slot="title">
						<GridSolid />
					</span>
				</TabItem>
			</Tabs>
			<!-- Status Dropdown -->
			<div>
				<Button
					class="h-[36px] gap-2 rounded-lg border border-gray-200 bg-[#F8F8F8] px-[16px] py-2.5 text-gray-800 hover:bg-white focus:ring-white"
					><AdjustmentsVerticalSolid />Filter By Status<ChevronDownOutline
						class="ms-2 h-6 w-6 text-gray-800"
					/></Button
				>
				<Dropdown class="w-60">
					<ul class="p-2">
						<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<Radio
								onchange={() => (filtered = allData.filter((d) => d.status === selectedStatus))}
								bind:group={selectedStatus}
								value="active"
								name="group3"
								color="blue">Active</Radio
							>
						</li>
						<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<Radio
								onchange={() => (filtered = allData.filter((d) => d.status === selectedStatus))}
								bind:group={selectedStatus}
								value="retired"
								name="group3"
								color="blue">Retired</Radio
							>
						</li>
						<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
							<Radio
								onchange={() => (filtered = allData.filter((d) => d.status === selectedStatus))}
								bind:group={selectedStatus}
								value="under construction"
								name="group3"
								color="blue">Subscribe newsletter</Radio
							>
						</li>
					</ul>
				</Dropdown>
			</div>
		</div>
		<!-- Data Table -->
		{#if selectedView === 'list'}
			<Table class="w-full table-auto border border-gray-200 text-left text-[14px]">
				<TableHead class="h-[50px] bg-gray-50 uppercase">
					<TableHeadCell class="px-4 py-2 font-semibold text-gray-500">Full Name</TableHeadCell>
					<TableHeadCell class="px-4 py-2 font-semibold text-gray-500">Location Name</TableHeadCell>
					<TableHeadCell class="px-4 py-2 font-semibold text-gray-500">Region</TableHeadCell>
					<TableHeadCell class="px-4 py-2 font-semibold text-gray-500">Details</TableHeadCell>
					<TableHeadCell class="px-4 py-2 font-semibold text-gray-500">Success Rate</TableHeadCell>
					<TableHeadCell class="px-4 py-2 font-semibold text-gray-500">Wikipedia Link</TableHeadCell
					>
					<TableHeadCell class="px-4 py-2 font-semibold text-gray-500">Status</TableHeadCell>
				</TableHead>
				<TableBody class="divide-y">
					{#each filtered as pad}
						<TableBodyRow class="h-[50px] font-semibold hover:bg-gray-100">
							<TableBodyCell class="px-4 py-2 text-gray-900">{pad.full_name}</TableBodyCell>
							<TableBodyCell class="px-4 py-2 text-gray-900">{pad.location.name}</TableBodyCell>
							<TableBodyCell class="px-4 py-2 text-gray-900">{pad.location.region}</TableBodyCell>
							<TableBodyCell class="px-4 py-2">
								<button
									onclick={() => ((defaultModal = true), (selectedData = pad))}
									class="rounded-md bg-gray-200 px-2 py-0.5 text-gray-900"
								>
									<span class="text-[12px]">View Details</span>
								</button>
							</TableBodyCell>
							<TableBodyCell class="px-4 py-2 text-gray-900">
								{#if pad.successful_landings !== 0}
									<div>
										<Progressbar
											progress={calculateProgress(pad.successful_landings, pad.attempted_landings)}
											progressClass="bg-green-400"
											size="h-1.5"
										/>
										<span class="text-xs text-gray-500">
											{calculateProgress(pad.successful_landings, pad.attempted_landings)}%
										</span>
									</div>
								{:else}
									<span class="text-xs text-gray-500">N/A</span>
								{/if}
							</TableBodyCell>
							<TableBodyCell class="px-4 py-2">
								<a
									href={pad.wikipedia}
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-600"
								>
									<LinkOutline class="h-5 w-5 text-blue-700" />
								</a>
							</TableBodyCell>
							<TableBodyCell class="px-4 py-2">
								{#if pad.status === 'active'}
									<span
										class="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
									>
										Active
									</span>
								{:else if pad.status === 'retired'}
									<span
										class="inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
									>
										Retired
									</span>
								{:else}
									<span
										class="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
									>
										Under Construction
									</span>
								{/if}
							</TableBodyCell>
						</TableBodyRow>
					{/each}
				</TableBody>
			</Table>
		{:else}
			<div class="grid w-full grid-cols-1 lg:grid-cols-3 lg:gap-3">
				{#each filtered as pad}
					<Card class="col-span-1">
						<div>
							<div class="flex justify-end">
								{#if pad.status === 'active'}
									<span
										class="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
									>
										Active
									</span>
								{:else if pad.status === 'retired'}
									<span
										class="inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
									>
										Retired
									</span>
								{:else}
									<span
										class="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
									>
										Under Construction
									</span>
								{/if}
							</div>
							<h5 class="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
								{pad.full_name}
							</h5>
							<h6 class="text-xs text-gray-500">{pad.location.name}, {pad.location.region}</h6>
						</div>
						<div class="mt-4 flex justify-between">
							<button
								onclick={() => ((defaultModal = true), (selectedData = pad))}
								class="rounded-md bg-gray-200 px-2 py-0.5 text-gray-900"
							>
								<span class="text-[12px]">View Details</span>
							</button>
							<a
								href={pad.wikipedia}
								target="_blank"
								class="inline-flex items-center text-sm text-blue-500 hover:underline"
							>
								<ArrowUpRightFromSquareOutline class="ms-2.5 h-4 w-4" />
							</a>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Details Modal -->
	<Modal
		color="gray"
		title={'Details - ' + selectedData.full_name}
		bind:open={defaultModal}
		autoclose
	>
		<p class="mb-10 text-base leading-relaxed text-gray-500">
			{selectedData.details}
		</p>
	</Modal>
{/if}
